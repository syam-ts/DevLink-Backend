import { InviteDocument } from "../../../domain/entities/Invite";

export interface ClientRepository {
    ViewInviteClient(clientId: string, inviteType: string): Promise<InviteDocument>;
}

export class ViewInviteClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string, inviteType: string) {
    const result = await this.clientRepository.ViewInviteClient(clientId,inviteType);
    return result;
  }
}
