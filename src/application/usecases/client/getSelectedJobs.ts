export interface UserRepository {
    getSelectedJobs(userId: string, jobsType: string, currentPage: number): Promise<any>;
  }
  
  export class GetSelectedJobsClient {
    constructor(private userRepository: UserRepository) {}
  
    async execute(clientId: string, jobsType: string, currentPage: number ) {
      const response = await this.userRepository.getSelectedJobs(
        clientId,
        jobsType,
        currentPage
      );
  
      return response;
    }
  }
  