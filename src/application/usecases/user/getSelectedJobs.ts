export interface UserRepository {
  getSelectedJobs(userId: string, jobsType: string, currentPage: number): void;
}

export class GetSelectedJobs {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, jobsType: string, currentPage: number ) {
    const response = await this.userRepository.getSelectedJobs(
      userId,
      jobsType,
      currentPage
    );

    return response;
  }
}
