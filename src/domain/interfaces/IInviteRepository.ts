import { InviteDocument } from "../entities/Invite";

export interface IInviteRepository {
    getAllInvitesUser(userId: string): Promise<InviteDocument[]>;
    rejectInviteByUser(inviteId: string): Promise<InviteDocument>;
    inviteUser(
        userId: string,
        clientId: string,
        jobPostId: string,
        description: string
    ): Promise<InviteDocument>;

    ViewInviteByClient(
        clientId: string,
        inviteType: string
    ): Promise<InviteDocument>;
}
