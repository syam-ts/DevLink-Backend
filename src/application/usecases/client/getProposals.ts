export interface ClientRepository {
  getProposals(clientId: string): Promise<any>;
}

export class GetProposals {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string) {
    const client = await this.clientRepository.getProposals(clientId);

    return client;
  }
}
