export interface AdminRepository {
  successMoneyTransfer(
    roleType: string,
    userId: string,
    paymentScreenshot: string,
    amount: number,
    upiId: number,
    requestId: string
  ): void;
}

export class SuccessMoneyTransfer {
  constructor(private adminRepository: AdminRepository) { }

  async execute(
    roleType: string,
    userId: string,
    paymentScreenshot: string,
    amount: number,
    upiId: number,
    requestId: string
  ) {
  
    const result = await this.adminRepository.successMoneyTransfer(
      roleType,
      userId,
      paymentScreenshot,
      amount,
      upiId,
      requestId
    );

    return result;
  }
}
