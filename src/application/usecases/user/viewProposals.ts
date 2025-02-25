export interface UserRepository {
  viewProposals(userId: string): void;
}

export class ViewProposals {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const result = await this.userRepository.viewProposals(userId);

    return result;
  }
}
