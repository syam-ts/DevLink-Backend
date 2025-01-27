import {  WishlistModel } from "../entities/WIshlist";

 

export class WishlistRepositoryMongoose {

  async addToWishlist(recipenaId: string, itemId: string): Promise<any> {
    
    console.log(recipenaId, itemId)
         const wishlist = new WishlistModel({
            recipenaId: recipenaId,
            itemId: itemId,
            createdAt: new Date()
         });

         const savedWishlist = await wishlist.save();
    
    return savedWishlist;
  }


async  getWishlist(recipeanId: string): Promise< any  > {

    const wishlist = await WishlistModel.find({recipeanId: recipeanId});

    if(!wishlist) throw new Error('No wishlist founded')
  }

  

}
