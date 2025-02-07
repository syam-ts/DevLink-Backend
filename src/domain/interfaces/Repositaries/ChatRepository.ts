import mongoose from "mongoose";
import { ChatModel } from "../../../domain/entities/Chat";
import { MessageModel } from "../../entities/Message";
import { UserModel } from "../../entities/User";
import { ClientModel } from "../../entities/Client";
// import { io } from '../../../infrastructure/socket/socket';

interface Members {
  members: string[];
}

interface Message {
  chatId: string;
  sender: string;
  text: string;
  read: boolean;
  roleType: string;
}


//sockets
// io.on("connection", (socket) => {
//   console.log("new user has connceted", socket.id);

//   socket.on("join_chat", (chatId) => {
//     socket.join(chatId);
//     console.log(`User joined chat: ${chatId}`);
// });


// socket.on("sendMessage", (message) => {
//   io.to(message.chatId).emit("receiveMessage", message);  
//   console.log("MESSAGE SENT:", message);
// });

// });


// io.on("sendMessage", (message: string) => {
//   io.emit("message", message);
//   console.log("mes", message);
// });

export class ChatRepositoryMongoose {




  async getAllChats(roleId: string): Promise<any> {

    const allChats = await ChatModel.find({ members: roleId });


    if (!allChats) throw new Error("No chats found");

    return allChats;
  }




  async viewChat(roleType: string, roleId: string, targetId: string): Promise<any> {

    

    let chat = await ChatModel.findOne({
      members: { $all: [roleId, targetId] }
    });
 

    if (!chat) {
      
        const client: any = await ClientModel.findOne({ $or: [{ _id: roleId }, { _id: targetId }] })
        const user: any = await UserModel.findOne({ $or: [{ _id: roleId }, { _id: targetId }] })
        console.log( 'client', client.companyName)
        chat = new ChatModel({
          members: [roleId, targetId],
          userData:  
            {
            userName: user.name,
            profilePicture: user.profilePicture
          } ,
          clientData:  
            {
              companyName: client.companyName,
            profilePicture: ""
          } ,
          messages: []
        })
    
    }

    await chat.save();


    return chat;

  }




  async sendMessage(body: Message): Promise<any> {
    const { chatId, sender, text, roleType }: Message = body;
 

    const newMessage = new MessageModel({
      chatId: chatId,
      sender: sender,
      text: text,
    });

    const savedMessage = await newMessage.save();



    // insert message inot chat
    if (roleType === 'client') {
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
      ).sort({ "chatHistory.clientChat.createdAt": 1 });


      return updateChat;
    } else {
      const updateChat = await ChatModel.findByIdAndUpdate(
        chatId,
        {

          $push: {
            "chatHistory.userChat": {
              text: text,
              createdAt: new Date(),
            },
          },
        },
        {
          new: true,
          upsert: true,
        }
      ).sort({ "chatHistory.useChat.createdAt": 1 });
      return updateChat;
    }




  }

}
