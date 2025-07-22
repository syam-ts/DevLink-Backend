import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

 

export class ListHomeJobs {
  constructor(private userRepository: IUserRepository) {}

    execute(type: string) {
    return this.userRepository.listHomeJobs(type);
 
  }
}
