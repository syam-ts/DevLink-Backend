export interface ClientRepository {
  inviteJobsList(clientId: string): void;
}

export class InviteJobsList {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string) {
    const jobs = await this.clientRepository.inviteJobsList(clientId);

    return jobs;
  }
}
