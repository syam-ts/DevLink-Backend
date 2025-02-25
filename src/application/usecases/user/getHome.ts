import { User } from "../../../domain/entities/User";
import { JobPostDocument } from "../../../domain/entities/JobPost";

export interface UserRepository {
  findAllClients(): Promise<User>;
  listHomeJobs(type: string): Promise<JobPostDocument>;
}

// view all class
export class getHomeUser {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const foundClients: any = await this.userRepository.findAllClients();

    return foundClients;
  }
}

// view all class
export class ListHomeJobs {
  constructor(private userRepository: UserRepository) {}

  async execute(type: string) {
    const allJobs = await this.userRepository.listHomeJobs(type);
    return allJobs;
  }
}
