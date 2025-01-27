import mongoose, { Schema, Model } from 'mongoose';


 export interface Wishlist extends Document {
  recipenaId: String;
  itemId: String ;
  createdAt: Date;
};

 

const WishlistSchema = new Schema<Wishlist>({
  recipenaId: { type: String, required: false },
  itemId: { type: String, required: false }, 
  createdAt: { type: Date, required: true },
});


export const WishlistModel: Model<Wishlist> = mongoose.model<Wishlist>('Wishlist', WishlistSchema);
