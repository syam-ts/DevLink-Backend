export interface WishlistRepository {
  removeFromWishlist(wishlistId: string, jobPostId: string): void;
}
 

export class RemoveFromWishlist {
  constructor(private wishlistRepository: WishlistRepository) {}

  async execute(wishlistId: string, jobPostId: string) {  
    const result = await this.wishlistRepository.removeFromWishlist(
      wishlistId,
      jobPostId
    );
    return result;
  }
};

