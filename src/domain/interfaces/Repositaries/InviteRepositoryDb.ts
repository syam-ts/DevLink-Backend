import { InviteDocument, InviteModel } from "../../entities/Invite";
import { IInviteRepository } from "../IInviteRepository";


export class InviteRepositoryDb implements IInviteRepository {
 
   async getAllInvitesUser(userId: string): Promise<InviteDocument[]> {
        const foundedInvites = await InviteModel.find({
              $and: [{ userId: userId }, { status: "pending" }],
            });
        
            if (!foundedInvites) throw new Error("Invite not Found");
            return foundedInvites;
    }

     async rejectInviteByUser(inviteId: string): Promise<InviteDocument> {
        const updateInvite = await InviteModel.updateOne(
          { _id: inviteId },
          {
            status: "rejected",
          },
          {
            new: true,
          }
        ).lean<InviteDocument>();
    
        if (!updateInvite) throw new Error("Invite not Found");
        return updateInvite as InviteDocument;
      }
}