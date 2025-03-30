"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRepositoryMongoose = void 0;
const WIshlist_1 = require("../../entities/WIshlist");
const JobPost_1 = require("../../entities/JobPost");
class WishlistRepositoryMongoose {
    addToWishlist(userId, jobPostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobPost = yield JobPost_1.JobPostModel.findById(jobPostId).exec();
            if (!jobPost)
                throw new Error("Job post not found");
            const jobPostData = {
                _id: jobPost._id,
                title: jobPost.title,
                description: jobPost.description,
                expertLevel: jobPost.expertLevel,
                location: jobPost.location,
                amount: jobPost.amount,
                paymentType: jobPost.paymentType,
                estimateTimeinHours: jobPost === null || jobPost === void 0 ? void 0 : jobPost.estimateTimeinHours,
                projectType: jobPost.projectType,
                requiredSkills: jobPost === null || jobPost === void 0 ? void 0 : jobPost.requiredSkills,
            };
            const existingWishlistOfUser = yield WIshlist_1.WishlistModel.find({ userId: userId });
            const existingJobPostInWishlist = yield WIshlist_1.WishlistModel.find({
                $and: [{ userId: userId }, { "jobPostData._id": { $in: [jobPostId] } }],
            });
            if (existingJobPostInWishlist.length > 0)
                throw new Error("Post already added");
            let wishlist;
            if (existingWishlistOfUser.length === 0) {
                const newWishlist = new WIshlist_1.WishlistModel({
                    userId: userId,
                    jobPostData: [jobPostData],
                });
                wishlist = yield newWishlist.save();
            }
            else {
                wishlist = yield WIshlist_1.WishlistModel.findOneAndUpdate({ userId: userId }, { $push: { jobPostData: jobPostData } }, { new: true });
            }
            if (!wishlist)
                throw new Error("Error occured");
            return wishlist;
        });
    }
    viewAllWishlist(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield WIshlist_1.WishlistModel.findOne({ userId: userId }).exec();
            if (!wishlist)
                throw new Error("No wishlist founded");
            return wishlist;
        });
    }
    removeFromWishlist(wishlistId, jobPostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteWishlist = yield WIshlist_1.WishlistModel.findOneAndUpdate({ _id: wishlistId }, { $pull: { jobPostData: { _id: jobPostId } } }, { new: true });
            if (!deleteWishlist)
                throw Error("Wishlist not found");
            return deleteWishlist;
        });
    }
}
exports.WishlistRepositoryMongoose = WishlistRepositoryMongoose;
