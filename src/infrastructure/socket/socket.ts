import { Socket } from "socket.io";
import { ChatModel } from "../../domain/entities/Chat";
import { Server as HttpServer } from "http";
const socket = require("socket.io");



interface Message {
  senderId: string,
  text: string
}

interface Chat {
  members?: [string],
  messages: [Message]
}


const initializeSocket = (server: HttpServer ) => {
  const io = socket(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {

    console.log(`New client connected: ${socket.id}`);

    socket.on("joinChat", ({ name, roleId, targetId }: {name: string, roleId: string, targetId: string}) => {
      const roomId = [roleId, targetId].sort().join("_");
      console.log(`User ${name} with ID ${roleId} joined chat with ${targetId}`);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ name, roleType, roleId, targetId, text }: {
      name: string,
      roleType: string,
      roleId: string,
      targetId: string,
      text: string,
    }) => {
      try {
      const roomId = [roleId, targetId].sort().join("_");
     

        let chat: any = await ChatModel.findOne({
          members: { $all: [roleId, targetId] }
        });

        if (!chat) {
          console.log('The memebers : ', roleId, roleType, name, targetId)
            chat = new ChatModel({
            members: [roleId, targetId],
            messages: []
          });  
        }
        
        if(roleType === 'user') {
          chat.messages.push({
            senderId: roleId,
            roleType,
            name,
            text
          })
        } else if(roleType === 'client') {
          chat.messages.push({
            senderId: roleId,
            roleType,
            name,
            text
          })
        } else {
          throw new Error('Role Type not specified')
        }

        

        await chat.save();

        io.to(roomId).emit("messageReceived", { name, text, roleType });
      } catch (err: unknown) {
        console.log(err)
      }


    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);

    });


  });
};

export default initializeSocket;
