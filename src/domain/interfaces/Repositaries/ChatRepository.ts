import mongoose from "mongoose";
import { Chat, ChatModel } from "../../../domain/entities/Chat";
import { MessageModel } from "../../entities/Message";
import { UserModel } from "../../entities/User";
import { Client, ClientModel } from "../../entities/Client";
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




  async getAllChats(roleId: string): Promise<Chat> {

    const allChats = await ChatModel.find({ members: roleId }).lean<Chat>().exec(); 

    if (!allChats) throw new Error("No chats found"); 
    return allChats;
  }




  async viewChat(roleType: string, roleId: string, targetId: string): Promise<unknown> { 

    let chat = await ChatModel.findOne({
      members: { $all: [roleId, targetId] }
    }); 

    if (!chat) { 
        const client = await ClientModel.findOne({ $or: [{ _id: roleId }, { _id: targetId }] });
        const user = await UserModel.findOne({ $or: [{ _id: roleId }, { _id: targetId }] })
         if(!client) throw new Error('')
         if(!user) throw new Error('')
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




  async sendMessage(body: Message): Promise<Chat> {
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
      ).sort({ "chatHistory.clientChat.createdAt": 1 }).lean<Chat>();


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
      ).sort({ "chatHistory.useChat.createdAt": 1 }).lean<Chat>();
      return updateChat;
    }
 

  } 
}
