import { ClientModel } from "../../domain/entities/Client";
import { InviteDocument, InviteModel } from "../../domain/entities/Invite";
import { JobPostModel } from "../../domain/entities/JobPost";
import { NotificationModel } from "../../domain/entities/Notification";
import { IInviteRepository } from "../../domain/interfaces/IInviteRepository";

 


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


       async inviteUser(
          userId: string,
          clientId: string,
          jobPostId: string,
          description: string
        ): Promise<InviteDocument> {
          const jobPostData = await JobPostModel.findById(jobPostId);
          if (!jobPostData) throw new Error("jobpost not found");
      
          const client = await ClientModel.findById(clientId);
          if (!client) throw new Error("client not found");
      
          const existingInvite = await InviteModel.find({
            $and: [{ "jobPostData._id": jobPostId }, { userId: userId }],
          });
      
          if (existingInvite.length !== 0) throw new Error("Invite already send");
      
          const inviteFn = new InviteModel({
            clientId,
            userId,
            description,
            jobPostData: {
              _id: jobPostData._id,
              title: jobPostData.title,
              description: jobPostData.description,
              expertLevel: jobPostData.expertLevel,
              location: jobPostData.location,
              requiredSkills: jobPostData.requiredSkills,
              amount: jobPostData.amount,
              paymentType: jobPostData.paymentType,
              estimateTimeinHours: jobPostData.estimateTimeinHours,
              projectType: jobPostData.projectType,
            },
            clientData: {
              companyName: client.companyName,
              email: client.email,
              location: client.location,
            },
            state: "pending",
            createdAt: new Date(),
          });
      
          const savedInvite = await inviteFn.save();
      
          const newNotificationClient = await NotificationModel.create({
            type: "invited user",
            message: "Invite sended to the user",
            sender_id: process.env._ADMIN_OBJECT_ID,
            reciever_id: clientId,
            inviteSuccess: {
              userId: userId,
            },
            createdAt: new Date(),
          });
          console.log(newNotificationClient);
      
          return savedInvite as InviteDocument;
        }


          async ViewInviteByClient(
            clientId: string,
            inviteType: string
          ): Promise<InviteDocument> {
            let invite;
            if (inviteType === "pending") {
              invite = await InviteModel.find({
                $and: [{ clientId: clientId }, { status: "pending" }],
              })
                .lean<InviteDocument>()
                .exec();
            } else {
              invite = await InviteModel.find({
                $and: [{ clientId: clientId }, { status: "rejected" }],
              })
                .lean<InviteDocument>()
                .exec();
            }
        
            if (!invite) throw new Error("No invites found");
            return invite;
          }
}