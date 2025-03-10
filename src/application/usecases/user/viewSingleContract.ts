import { ContractDocument } from "../../../domain/entities/Contract";

export interface UserRepositary {
  viewSingleContract(contractId: string): Promise<ContractDocument>;
}

export class ViewSingleContractUser {
  constructor(private userRepositary: UserRepositary) {}

  async execute(contractId: string) {
    const response = await this.userRepositary.viewSingleContract(contractId);

    return response;
  }
}
