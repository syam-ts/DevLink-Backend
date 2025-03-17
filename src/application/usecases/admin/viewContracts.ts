import { ContractDocument } from "../../../domain/entities/Contract";

export interface AdminRepositary {
  viewContracts(): ContractDocument;
}

export class ViewContractsAdmin {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute() {
    const result = await this.adminRepositary.viewContracts();
    return result;
  }
}
