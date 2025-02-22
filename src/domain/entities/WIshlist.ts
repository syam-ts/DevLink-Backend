import mongoose, { Schema, Model } from "mongoose";
import { Jobs, jobPostSchema } from "../entities/User";

export interface Wishlist extends Document {
  userId: String;
  jobPostData: [Jobs];
}

const WishlistSchema = new Schema<Wishlist>({
  userId: { type: String, required: false },
  jobPostData: [
    {
      type: jobPostSchema,
      required: false,
    },
  ],
});

export const WishlistModel: Model<Wishlist> = mongoose.model<Wishlist>(
  "Wishlist",
  WishlistSchema
);
