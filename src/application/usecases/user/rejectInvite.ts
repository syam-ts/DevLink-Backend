import { IInviteRepository } from "../../../domain/interfaces/IInviteRepository";

export class RejectInvite {
  constructor(private inviteRepositary: IInviteRepository) { }

  execute(inviteId: string) {
    return this.inviteRepositary.rejectInviteByUser(inviteId);
  }
}
