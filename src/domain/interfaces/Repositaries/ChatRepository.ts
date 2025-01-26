import mongoose from 'mongoose';
import { ChatModel } from '../../../domain/entities/Chat';
import { MessageModel } from '../../entities/Message';


interface Members {
  members: string[]
}

export interface Message {
  chatId: string;
  sender: string;
  text: string;
  read: boolean;
}




export class ChatRepositoryMongoose {

  async createChat(membersIds: any): Promise<any> {


    const updateChat = new ChatModel({
      members: membersIds.members.map((id: any) => new mongoose.Types.ObjectId(id)),
      createdAt: new Date()
    });

    const savedChat = await updateChat.save();

    return savedChat;
  }


  async sendMessage(body: Message): Promise<any> {
  
    const { chatId, sender, text }: Message = body;

    const newMessage = new MessageModel({
      chatId: chatId,
      sender: sender,
      text: text
    });

    const savedMessage = await newMessage.save();




    return savedMessage;
  }


  async getAllChats(memberId: string): Promise<any> {
  
     const allChats = await ChatModel.find({members: {$in: memberId}});

     if(!allChats) throw new Error('No chats found');
     console.log('THE RESPO : ',allChats)

    return allChats;
  }

}