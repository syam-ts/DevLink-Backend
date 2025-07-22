import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class BoostSuccess {
  constructor(private userRepositary: IUserRepository) { }

  execute(userId: string) {
    return this.userRepositary.boostSuccess(userId);
  }
}
