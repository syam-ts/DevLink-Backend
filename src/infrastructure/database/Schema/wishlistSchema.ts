import mongoose, { Model, Schema } from "mongoose";
import { IWishlist } from "../../../domain/entities/WIshlist";
import { JobPostSchema } from "./jobSchema";

const WishlistSchema = new Schema<IWishlist>({
    userId: { type: String, required: false },
    jobPostData: [
        {
            type: JobPostSchema,
            required: false,
        },
    ],
});

export const WishlistModel: Model<IWishlist> = mongoose.model<IWishlist>(
    "Wishlist",
    WishlistSchema
);
