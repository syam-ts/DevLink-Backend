
import { IInviteDocument } from "../../domain/entities/Invite";
import { IInviteRepository } from "../../domain/interfaces/IInviteRepository";
import { ClientModel } from "../database/Schema/clientSchema";
import { InviteModel } from "../database/Schema/inviteSchema";
import { JobPostModel } from "../database/Schema/jobSchema";
import { NotificationModel } from "../database/Schema/notificationSchema";

 


export class InviteRepositoryDb implements IInviteRepository {
 
   async getAllInvitesUser(userId: string): Promise<IInviteDocument[]> {
        const foundedInvites = await InviteModel.find({
              $and: [{ userId: userId }, { status: "pending" }],
            });
        
            if (!foundedInvites) throw new Error("Invite not Found");
            return foundedInvites;
    }

     async rejectInviteByUser(inviteId: string): Promise<IInviteDocument> {
        const updateInvite = await InviteModel.updateOne(
          { _id: inviteId },
          {
            status: "rejected",
          },
          {
            new: true,
          }
        ).lean<IInviteDocument>();
    
        if (!updateInvite) throw new Error("Invite not Found");
        return updateInvite as IInviteDocument;
      }


       async inviteUser(
          userId: string,
          clientId: string,
          jobPostId: string,
          description: string
        ): Promise<IInviteDocument> {
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
      
          return savedInvite as IInviteDocument;
        }


          async ViewInviteByClient(
            clientId: string,
            inviteType: string
          ): Promise<IInviteDocument> {
            let invite;
            if (inviteType === "pending") {
              invite = await InviteModel.find({
                $and: [{ clientId: clientId }, { status: "pending" }],
              })
                .lean<IInviteDocument>()
                .exec();
            } else {
              invite = await InviteModel.find({
                $and: [{ clientId: clientId }, { status: "rejected" }],
              })
                .lean<IInviteDocument>()
                .exec();
            }
        
            if (!invite) throw new Error("No invites found");
            return invite;
          }
}