import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class ViewWalletUser {
  constructor(private userRepositary: IUserRepository) { }

  execute(userId: string, currentPage: number) {
    return this.userRepositary.viewWallet(userId, currentPage);
  }
}
