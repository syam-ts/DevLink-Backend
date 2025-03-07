export interface AdminRepositary {
  getWithdrawRequests(): void;
}

export class GetWithdrawRequests {
  constructor(private adminRepositary: AdminRepositary) {}

  async execute() {
    const result = await this.adminRepositary.getWithdrawRequests();
    return result;
  }
}
