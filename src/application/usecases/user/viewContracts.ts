export interface UserRepositary {
  viewContracts(userId: string, contractViewType: string): void;
}

export class ViewContracts {
  constructor(private userRepositary: UserRepositary) {}

  async execute(userId: string, contractViewType: string) {
    const response = await this.userRepositary.viewContracts(
      userId,
      contractViewType
    );

    return response;
  }
}
