export interface WishlistRepository {
  addToWishlist(userId: string, jobPostId: string): void;
}

export class AddToWishlist {
  constructor(private wishlistRepository: WishlistRepository) {}

  async execute(userId: string, jobPostId: string) {
    const response = await this.wishlistRepository.addToWishlist(
      userId,
      jobPostId
    );
    return response;
  }
}
