export interface ClientRepository {
    withdrawMoney(
      clientId: string,
      amount: number,
      accountNumber: number 
    ): void;
  }
  
  export class WithdrawMoneyByClient {
    constructor(private clientRepository: ClientRepository) {}
  
    async execute(
      clientId: string,
      amount: number,
      accountNumber: number 
    ) { 
  
      const result = await this.clientRepository.withdrawMoney(
        clientId,
        amount,
        accountNumber 
      );
  
      return result;
    }
  }
  