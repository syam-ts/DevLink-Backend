export interface UserRepository {
  withdrawMoney(userId: string, amount: number, accountNumber: number): void;
}

export class WithdrawMoneyByUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, amount: number, accountNumber: number) {
    const result = await this.userRepository.withdrawMoney(userId, amount, accountNumber);

    return result;
  }
}
