export interface UserRepositary {
  viewAllWishlist(userId: string): Promise<any>;
}

export class ViewAllWishlist {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string) {
    const response: any = await this.userRepositary.viewAllWishlist(userId);

    return response;
  }
}
