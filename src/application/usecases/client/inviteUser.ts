import { InviteDocument } from "../../../domain/entities/Invite";

export interface ClientRepository {
  inviteUser(
    userId: string,
    clientId: string,
    jobPostId: string,
    description: string
  ): Promise<InviteDocument>;
}

export class InviteUser {
  constructor(private clientRepository: ClientRepository) { }

  async execute(
    userId: string,
    clientId: string,
    jobPostId: string,
    description: string
  ) {


    if (!jobPostId) {
      throw new Error('Please select a jobPost');
    }

    if (description.length < 10 && description.length < 30) {
      throw new Error('Description should be between 10 to 30 characters');
    } 

    const result = await this.clientRepository.inviteUser(
      userId,
      clientId,
      jobPostId,
      description
    );
    return result;
  }
}
