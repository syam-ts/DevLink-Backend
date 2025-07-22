import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class ViewContracts {
  constructor(private userRepositary: IUserRepository) { }

  execute(userId: string, contractViewType: string, currentPage: number) {
    return this.userRepositary.viewContracts(
      userId,
      contractViewType,
      currentPage
    );
  }
}
