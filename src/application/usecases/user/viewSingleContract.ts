import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class ViewSingleContractUser {
  constructor(private userRepositary: IUserRepository) { }

  async execute(contractId: string) {
    return this.userRepositary.viewSingleContract(contractId);
  }
}
