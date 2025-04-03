export interface AdminRepository {
  successMoneyTransfer(
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
    userId: string,
    paymentScreenshot: string,
    amount: number,
    upiId: number,
    requestId: string
  ) {
  
    const result = await this.adminRepository.successMoneyTransfer(
      userId,
      paymentScreenshot,
      amount,
      upiId,
      requestId
    );

    return result;
  }
}
