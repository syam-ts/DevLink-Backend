import { Wishlist } from "../../../domain/entities/WIshlist";

export interface UserRepositary {
  viewAllWishlist(userId: string): Promise<Wishlist>
};

export class ViewAllWishlist {
  constructor(private userRepositary: UserRepositary) {};

  async execute(userId: string) {
    const response = await this.userRepositary.viewAllWishlist(userId);

    return response;
  }
}
