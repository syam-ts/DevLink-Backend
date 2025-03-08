export interface ClientRepository {
    ViewInviteClient(clientId: string): Promise<any>;
}

export class ViewInviteClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(clientId: string) {
    const result = await this.clientRepository.ViewInviteClient(clientId);
    return result;
  }
}
