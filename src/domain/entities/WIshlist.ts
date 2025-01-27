import mongoose, { Schema, Model } from 'mongoose';


 interface WishlistDocument extends Document {
  recipenaId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId; 
  createdAt: Date;
};

 

const WishlistSchema = new Schema<WishlistDocument>({
  recipenaId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  createdAt: { type: Date, required: true },
});


export const WishlistModel: Model<WishlistDocument> = mongoose.model<WishlistDocument>('Wishlist', WishlistSchema);
