export interface UserRepository {
  withdrawMoney(userId: string, amount: number, accountNumber: number): void;
}

export class WithdrawMoneyByUser {
  constructor(private userRepository: UserRepository) { }

  async execute(
    userId: string,
    amount: number,
    accountNumber: number,
    balance: number
  ) {
    if (!amount || !accountNumber) throw new Error("Please fill all fields");

    if (amount > balance || amount <= 0)
      throw new Error("Amount need to valid");

    if (
      accountNumber.toString().length > 14 ||
      accountNumber.toString().length < 14
    )
      throw new Error("Account number should be minimum 14 numbers");

    const result = await this.userRepository.withdrawMoney(
      userId,
      amount,
      accountNumber
    );

    return result;
  }
}
