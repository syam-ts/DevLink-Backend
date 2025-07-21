import { InviteDocument } from "../entities/Invite";

export interface IInviteRepository {

    getAllInvitesUser(userId: string):Promise<InviteDocument[]>
    rejectInviteByUser(inviteId: string):Promise<InviteDocument>
}