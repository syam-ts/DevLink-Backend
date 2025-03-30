import { ContractDocument } from "../../../domain/entities/Contract";

export interface AdminRepositary {
  viewContracts(currentPage: number): Promise<{contracts: ContractDocument[], totalPages: number}>;
}

export class ViewContractsAdmin {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute(currentPage: number) {
    const result = await this.adminRepositary.viewContracts(currentPage);
    return result;
  }
}
