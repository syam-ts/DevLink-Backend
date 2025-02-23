import { Wishlist, WishlistModel } from "../entities/WIshlist";
import { Jobs } from "../entities/User";
import { JobPostModel } from "../entities/JobPost";

export class WishlistRepositoryMongoose {
  async addToWishlist(userId: string, jobPostId: string): Promise<Wishlist> {

    const jobPost = await JobPostModel.findById(jobPostId).exec();
    if (!jobPost) throw new Error("Job post not found");

    const jobPostData: Jobs = {
      _id: jobPost._id,
      title: jobPost.title,
      description: jobPost.description,
      expertLevel: jobPost.expertLevel,
      location: jobPost.location,
      amount: jobPost.amount,
      paymentType: jobPost.paymentType,
      estimateTimeinHours: jobPost?.estimateTimeinHours,
      projectType: jobPost.projectType,
      requiredSkills: jobPost?.requiredSkills,
    };

    const existingWishlistOfUser = await WishlistModel.find({ userId: userId });

    const existingJobPostInWishlist = await WishlistModel.find({
      $and: [{ userId: userId }, { "jobPostData._id": { $in: [jobPostId] } }],
    });

    if (existingJobPostInWishlist.length > 0)
      throw new Error("Post already added");

    let wishlist;
    if (existingWishlistOfUser.length === 0) {
      const newWishlist: any = new WishlistModel({
        userId: userId,
        jobPostData: [jobPostData],
      });
      wishlist = await newWishlist.save();
    } else {
      wishlist = await WishlistModel.findOneAndUpdate(
        { userId: userId },
        { $push: { jobPostData: jobPostData } },
        { new: true }
      );
    }

    return wishlist;
  }

  async viewAllWishlist(userId: string): Promise<any> {
    const wishlist = await WishlistModel.find({ userId: userId }).exec(); 
    if (!wishlist) throw new Error("No wishlist founded");

    return wishlist;
  }

  async removeFromWishlist(
    wishlistId: string,
    jobPostId: string
  ): Promise<Wishlist> {

    const deleteWishlist = await WishlistModel.findOneAndUpdate(
      { _id: wishlistId },
      { $pull: { jobPostData: { _id: jobPostId } } },
      { new: true }
    );
 
    if (!deleteWishlist) throw Error("Wishlist not found"); 

    return deleteWishlist;
  }
}
