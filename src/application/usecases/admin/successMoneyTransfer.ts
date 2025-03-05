export interface AdminRepository {
  successMoneyTransfer(
    userId: string,
    paymentScreenshot: string,
    amount: number,
    upiId: number
  ): void;
}

export class SuccessMoneyTransfer {
  constructor(private adminRepository: AdminRepository) {}

  async execute(
    userId: string,
    paymentScreenshot: string,
    amount: number,
    upiId: number
  ) {
    const result = await this.adminRepository.successMoneyTransfer(
      userId,
      paymentScreenshot,
      amount,
      upiId
    );

    return result;
  }
}
