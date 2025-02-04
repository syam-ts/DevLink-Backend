const socket = require("socket.io");

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
  
      socket.on("sendMessage", ({ name, roleId, targetId, text }: any) => {
          console.log(`${name} (${roleId}) sent message: ${text}`);
          const roomId = [roleId, targetId].sort().join("_");
          io.to(roomId).emit("messageReceived", { name, text });
      });
  
      socket.on("disconnect", () => {
          console.log(`Client disconnected: ${socket.id}`);
     
  });
  
    
});
};

export default initializeSocket;
