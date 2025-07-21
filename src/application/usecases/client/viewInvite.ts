import { IInviteRepository } from "../../../domain/interfaces/IInviteRepository";

export class ViewInviteByClient {
  constructor(private inviteRepository: IInviteRepository) { }

  execute(clientId: string, inviteType: string) {
    return this.inviteRepository.ViewInviteByClient(clientId, inviteType);
  }
}
