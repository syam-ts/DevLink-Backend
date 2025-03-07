export interface AdminRepositary {
  viewContracts(): Promise<any>;
}

export class ViewContractsAdmin {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute() {
    const result = await this.adminRepositary.viewContracts();
    return result;
  }
}
