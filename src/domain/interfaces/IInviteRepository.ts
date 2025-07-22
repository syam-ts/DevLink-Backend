import { IInviteDocument } from "../entities/Invite";

 

export interface IInviteRepository {
    getAllInvitesUser(userId: string): Promise<IInviteDocument[]>;
    rejectInviteByUser(inviteId: string): Promise<IInviteDocument>;
    inviteUser(
        userId: string,
        clientId: string,
        jobPostId: string,
        description: string
    ): Promise<IInviteDocument>;

    ViewInviteByClient(
        clientId: string,
        inviteType: string
    ): Promise<IInviteDocument>;
}
