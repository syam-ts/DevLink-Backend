import { IWishlist } from "../../../domain/entities/WIshlist";

 

export interface UserRepositary {
  viewAllWishlist(userId: string): Promise<IWishlist>;
}

export class ViewAllWishlist {
  constructor(private userRepositary: UserRepositary) {}

  execute(userId: string) {
    return this.userRepositary.viewAllWishlist(userId);
  }
}
