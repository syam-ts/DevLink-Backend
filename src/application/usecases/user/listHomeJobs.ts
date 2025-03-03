export interface UserRepository {
  listHomeJobs(type: string): void;
}

export class ListHomeJobs {
  constructor(private userRepository: UserRepository) {}

  async execute(type: string) {
    const allJobs = await this.userRepository.listHomeJobs(type);
    return allJobs;
  }
}
