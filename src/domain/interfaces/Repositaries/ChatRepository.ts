import mongoose from "mongoose";
import { ChatModel } from "../../../domain/entities/Chat";
import { MessageModel } from "../../entities/Message";
import { UserModel } from "../../entities/User";
import { ClientModel } from "../../entities/Client";

interface Members {
  members: string[];
}

interface Message {
  chatId: string;
  sender: string;
  text: string;
  read: boolean;
}

export class ChatRepositoryMongoose {

  async createChat(membersIds: any): Promise<any> {
    const clientName: any = await ClientModel.findById(
      membersIds.members.clientId
    );
    const userName: any = await UserModel.findById(membersIds.members.userId);

    const members = {
      clientId: membersIds.members.clientId,
      clientName: clientName.companyName,
      userId: membersIds.members.userId,
      userName: userName.name,
      chatHistory: {
        clientChat: [{"text": "", "date": ""}],
        userChat: [{"text": "", "createdAt": ""}]
      }
    };

    const updateChat = new ChatModel({
      members,
      createdAt: new Date(),
    });

    const savedChat = await updateChat.save();


    return savedChat;
  }




  async getAllChats(memberId: string): Promise<any> {
    const allChats = await ChatModel.find({ $or:[{"members.clientId": memberId}, {"members.userId": memberId}] });
 

    if (!allChats) throw new Error("No chats found");

    return allChats;
  }


  async viewChat(chatId: string): Promise<any> {
   
    const currentChat = await ChatModel.findById(chatId).exec();

    if(!currentChat) throw new Error('Not found the chat');

    return currentChat;

  }


  

  async sendMessage(body: Message): Promise<any> {
    const { chatId, sender, text }: Message = body;
    console.log('THE BODY: ',body)

    const newMessage = new MessageModel({
      chatId: chatId,
      sender: sender,
      text: text,
    });

    const savedMessage = await newMessage.save();

    

    // insert message inot chat
    const updateChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        
        $push: {
          "chatHistory.clientChat": {
            text: text,
            createdAt: new Date(),
          },
        },
      },
      {
        new: true, 
        upsert: true,  
      }
    );
    
    


    return updateChat;
  }

}
