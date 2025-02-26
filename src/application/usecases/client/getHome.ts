import { Client } from "../../../domain/entities/Client";

export interface ClientRepository {
  findAllUsers(): Promise<Client | null>;
  trendingJobs(): Promise<null>;
}

export class getHomeClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute() {
    const foundUsers: any = await this.clientRepository.findAllUsers(); 
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
