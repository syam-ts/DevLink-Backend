import { User } from "../../../domain/entities/User";
import { JobPostDocument } from "../../../domain/entities/JobPost";

export interface UserRepository {
  findAllClients(): Promise<User>;
  listHomeJobs(type: string): Promise<JobPostDocument>;
}

export class getHomeUser {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const foundClients = await this.userRepository.findAllClients();

    return foundClients;
  }
}

export class ListHomeJobs {
  constructor(private userRepository: UserRepository) {}

  async execute(type: string) {
    const allJobs = await this.userRepository.listHomeJobs(type);
    return allJobs;
  }
}
