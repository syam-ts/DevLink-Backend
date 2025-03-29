import { ContractDocument } from "../../../domain/entities/Contract";

export interface UserRepositary {
  viewContracts(
    userId: string,
    contractViewType: string,
    currentPage: number
  ): Promise<{contract: ContractDocument[], totalPages: number}>;
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
