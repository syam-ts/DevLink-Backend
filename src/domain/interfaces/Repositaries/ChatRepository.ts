import mongoose from 'mongoose';
import { ChatModel } from '../../../domain/entities/Chat';


  interface Members {
    members: string[]
  }
  


export class ChatRepositoryMongoose {

   async createChat(membersIds: any): Promise< any> {
   
    
         const updateChat = new ChatModel({
            members: membersIds.members.map((id: any) => new mongoose.Types.ObjectId(id)),
            createdAt: new Date()
         });

         const savedChat = await updateChat.save();
      
       return savedChat;
   } 

}