export interface UserRepositary {
  viewContracts(userId: string, contractViewType: string, currentPage: number): void;
}

export class ViewContracts {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string, contractViewType: string, currentPage: number) {
    const response = await this.userRepositary.viewContracts(
      userId,
      contractViewType,
      currentPage
    );

    return response;
  }
}
