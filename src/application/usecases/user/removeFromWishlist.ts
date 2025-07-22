export interface WishlistRepository {
  removeFromWishlist(wishlistId: string, jobPostId: string): void;
}

export class RemoveFromWishlist {
  constructor(private wishlistRepository: WishlistRepository) { }

  execute(wishlistId: string, jobPostId: string) {
    return this.wishlistRepository.removeFromWishlist(wishlistId, jobPostId);
  }
}
