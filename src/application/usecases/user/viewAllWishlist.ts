import { Wishlist } from "../../../domain/entities/WIshlist";

export interface UserRepositary {
  viewAllWishlist(userId: string): Promise<Wishlist>;
}

export class ViewAllWishlist {
  constructor(private userRepositary: UserRepositary) {}

  execute(userId: string) {
    return this.userRepositary.viewAllWishlist(userId);
  }
}
