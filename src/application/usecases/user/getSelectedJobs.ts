export interface UserRepository {
  getSelectedJobs(userId: string, jobsType: string, query: Query, currentPage: number): void;
}

interface Query {
  amount: number
  projectType: 'houly' | 'fixed'
  expertLevel: 'beginner' | 'intermediate' | 'advanced'
}

export class GetSelectedJobs {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, jobsType: string,query: Query, currentPage: number ) { 
    const response = await this.userRepository.getSelectedJobs(
      userId,
      jobsType,
      query,
      currentPage
    );

    return response;
  }
}
