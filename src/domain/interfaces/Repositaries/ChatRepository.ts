import mongoose from "mongoose";
import { ChatModel } from "../../../domain/entities/Chat";
import { MessageModel } from "../../entities/Message";
import { UserModel } from "../../entities/User";
import { ClientModel } from "../../entities/Client";
import { io } from '../../../infrastructure/socket/socket';

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
io.on("connection", (socket) => {
  console.log("new user has connceted", socket.id);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
});


socket.on("sendMessage", (message) => {
  io.to(message.chatId).emit("receiveMessage", message);  
  console.log("MESSAGE SENT:", message);
});

});


io.on("sendMessage", (message: string) => {
  io.emit("message", message);
  console.log("mes", message);
});

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
        clientChat: [{ "text": "", "date": "" }],
        userChat: [{ "text": "", "createdAt": "" }]
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
    const allChats = await ChatModel.find({ $or: [{ "members.clientId": memberId }, { "members.userId": memberId }] });


    if (!allChats) throw new Error("No chats found");

    return allChats;
  }


  async viewChat(chatId: string): Promise<any> {

    const currentChat = await ChatModel.findById(chatId).exec();

    if (!currentChat) throw new Error('Not found the chat');

    return currentChat;

  }




  async sendMessage(body: Message): Promise<any> {
    const { chatId, sender, text, roleType }: Message = body;
    console.log('THE BODY: ', body)

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
      ).sort({"chatHistory.clientChat.createdAt": 1});


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
      ).sort({"chatHistory.useChat.createdAt": 1});
      return updateChat;
    }




  }

}
