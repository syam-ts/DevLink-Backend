import { IInviteRepository } from "../../../domain/interfaces/IInviteRepository";

export class GetAllInvites {
  constructor(private inviteRepositary: IInviteRepository) { }

  execute(userId: string) {
    return this.inviteRepositary.getAllInvitesUser(userId);
  }
}
