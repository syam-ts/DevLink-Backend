import { Client } from "../../../domain/entities/Client";
import { JobPostDocument } from "../../../domain/entities/JobPost";
import { User } from "../../../domain/entities/User";

export interface ClientRepository {
  findAllUsers(): Promise<User[]>;
  trendingJobs(): Promise<JobPostDocument[]>;
}

export class getHomeClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute() {
    const foundUsers = await this.clientRepository.findAllUsers();
    return foundUsers;
  }
}

export class TrendingJobs {
  constructor(private clientRepository: ClientRepository) {}

  async execute() {
    const trendingJobs = await this.clientRepository.trendingJobs();
    return trendingJobs;
  }
}
