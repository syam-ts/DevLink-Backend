 

export interface WishlistRepository {
    addToWishlist(userId: string, itemId: string): Promise< any >
} 



export class AddToWishlist {
    constructor(private wishlistRepository: WishlistRepository) {}

    async execute( userId: string, itemId: string ) {   

           const response = await this.wishlistRepository.addToWishlist(userId, itemId); 
             

           return response;
    }
}