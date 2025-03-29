import { InviteDocument } from "../../../domain/entities/Invite";
  

export interface UserRepositary {
  rejectInvite(inviteId: string): Promise<InviteDocument>;
}

export class RejectInvite {
  constructor(private userRepositary: UserRepositary) {}

  async execute(inviteId: string) {
    const rejectedInvite = await this.userRepositary.rejectInvite(inviteId);

    return rejectedInvite;
  }
}
