import { WishlistModel } from "../entities/WIshlist";
import { Jobs, jobPostSchema } from "../entities/User";
import { JobPostModel } from "../entities/JobPost";

export class WishlistRepositoryMongoose {
  async addToWishlist(userId: string, jobPostId: string): Promise<any> {
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

    const existingWishlist = await WishlistModel.find({ userId: userId });

    let wishlist;
    if (existingWishlist.length === 0) {
      const newWishlist: any = new WishlistModel({
        userId: userId,
        jobPostData: [jobPostData],
      });
      wishlist = await newWishlist.save();
    } else {
      wishlist = await WishlistModel.findOneAndUpdate(
        {
          userId: userId,
        },
        {
          $push: { jobPostData: jobPostData },
        },
        {
          new: true,
        }
      );
    }

    return wishlist;
  }

  async getWishlist(recipeanId: string): Promise<any> {
    const wishlist = await WishlistModel.find({ recipeanId: recipeanId });

    if (!wishlist) throw new Error("No wishlist founded");
  }
}
