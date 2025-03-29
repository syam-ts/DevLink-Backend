import { User } from "../../../domain/entities/User";
import { JobPostDocument } from "../../../domain/entities/JobPost";
import { Client } from "../../../domain/entities/Client";

export interface UserRepository {
  findAllClients(): Promise<Client[]>;
  listHomeJobs(type: string): Promise<{latestJobs?: JobPostDocument[],
      allJobs?: JobPostDocument[], totalJobs?: number,
       totalHours?: unknown, verifiedAccounts?: number}>;
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
