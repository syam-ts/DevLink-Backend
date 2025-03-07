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
    requestId: string,
    requestedAmount: number
  ) {
    if (!paymentScreenshot || !amount || !upiId)
      throw new Error("All field need to filled");
    if (amount > requestedAmount || amount <= 0)
      throw new Error("Invaild amount");
    if (upiId <= 0 || upiId.toString().length < 10)
      throw new Error("Upi Id should 10 numbers");

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
