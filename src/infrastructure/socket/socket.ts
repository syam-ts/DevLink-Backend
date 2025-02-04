import { ChatModel } from "../../domain/entities/Chat";

const socket = require("socket.io");



interface Message {
  senderId: string,
  text: string
}

interface Chat {
  members?: [string],
  messages: [Message]
}


const initializeSocket = (server: any) => {
  const io = socket(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH"],
      credentials: true,
    },
  });

  io.on("connection", (socket: any) => {

    console.log(`New client connected: ${socket.id}`);

    socket.on("joinChat", ({ name, roleId, targetId }: any) => {
      const roomId = [roleId, targetId].sort().join("_");
      console.log(`User ${name} with ID ${roleId} joined chat with ${targetId}`);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ name, roleType, roleId, targetId, text }: any) => {
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
      } catch (err: any) {
        console.log(err)
      }


    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);

    });


  });
};

export default initializeSocket;
