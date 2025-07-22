import { IContractDocument } from "../../../domain/entities/Contract";

export interface AdminRepository {
  viewSingleContract(contractId: string): Promise<IContractDocument>;
}

export class ViewSingleContractAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute(contractId: string) {
    const result = await this.adminRepository.viewSingleContract(contractId);

    return result;
  }
}
