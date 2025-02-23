export interface WishlistRepository {
  removeFromWishlist(wishlistId: string, jobPostId: string): Promise<any>;
}

interface WishlistData {
  wishlistId: string;
  jobPostId: string;
}

export class RemoveFromWishlist {
  constructor(private wishlistRepository: WishlistRepository) {}

  async execute(wishlistData: WishlistData) {
    const { wishlistId, jobPostId }: { wishlistId: string; jobPostId: string } =
      wishlistData;
    const result = await this.wishlistRepository.removeFromWishlist(
      wishlistId,
      jobPostId
    );
    return result;
  }
}
