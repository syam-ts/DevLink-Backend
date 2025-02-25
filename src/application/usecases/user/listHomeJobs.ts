export interface UserRepository {
  listHomeJobs(type: string): Promise<any>; 
}


export class ListHomeJobs {
  constructor(private userRepository: UserRepository) {}

  async execute(type: string) {
   
      const allJobs = await this.userRepository.listHomeJobs(type);
      return allJobs;
    
  }
}
