import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class WithdrawMoneyByUser {
  constructor(private userRepository: IUserRepository) { }

  execute(userId: string, amount: number, accountNumber: number) {
    return this.userRepository.withdrawMoney(userId, amount, accountNumber);
  }
}
