interface Proposal {
  type: string;
  UserId: string;
  jobPostId: string;
  jobPostInfo: string;
  userData: {};
  description?: string;
  status?: string;
  bidamount: number;
  bidDeadline: number;
  createdAt: Date;
}

export interface ClientRepository {
  getProposals(clientId: string): Promise<Proposal>;
}

export class GetProposals {
  constructor(private clientRepository: ClientRepository) { }

  async execute(clientId: string) {
    const client = await this.clientRepository.getProposals(clientId);

    return client;
  }
}
