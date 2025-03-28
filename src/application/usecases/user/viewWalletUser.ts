export interface UserRepositary {


  viewWallet(userId: string, currentPage: number): void;
}

export class ViewWalletUser {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string, currentPage: number) {
    const result = await this.userRepositary.viewWallet(userId, currentPage);

    return result;
  }
}
