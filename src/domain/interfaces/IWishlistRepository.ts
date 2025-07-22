import { IWishlist } from "../entities/WIshlist";

export interface IWishlistRepository {
    
    addToWishlist(userId: string, jobPostId: string): Promise<IWishlist>;

    viewAllWishlist(userId: string): Promise<IWishlist>;

    removeFromWishlist(wishlistId: string, jobPostId: string): Promise<IWishlist>;
}
