import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class ViewProposals {
  constructor(private userRepository: IUserRepository) { }

  execute(userId: string) {
    return this.userRepository.viewProposals(userId);
  }
}
