import { User } from "../../../domain/entities/User";

interface Proposal {
  type: string;
  UserId: string;
  jobPostId: string;
  jobPostInfo: string;
  userData: User;
  description?: string;
  status?: string;
  bidamount: number;
  bidDeadline: number;
  createdAt: Date;
}

export interface ClientRepository {
  getProposals(clientId: string): Promise<any>;
}

export class GetProposals {
  constructor(private clientRepository: ClientRepository) { }

  async execute(clientId: string) {
    const client = await this.clientRepository.getProposals(clientId);

    return client;
  }
}
