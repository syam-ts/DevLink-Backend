export interface ClientRepository {
  listAllJobs(clientId: string): void;
}

export class ListAllJobs {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string) {
    const jobs = await this.clientRepository.listAllJobs(clientId);

    return jobs;
  }
}
