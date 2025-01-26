import express from "express";
import http from "node:http";
require("dotenv").config();
import cors from "cors";
import cookieparser from "cookie-parser";
import { Server } from 'socket.io';
import { connectDB } from "./infrastructure/database/db";
import routes from "./infrastructure/http/routes";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000", // Update to match your frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});




app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use("/", routes);


//sockets
io.on('connection', (socket) => {
    console.log('new user has connceted', socket.id);


    socket.on('sendMessage', (message: string) => {
      console.log('TEH RECEIVED MESSAGE : ', message)
    })
});


io.on('sendMessage', (message: string) => {
  io.emit('message', message);
  console.log('mes', message)
})

const PORT: number = (process.env.PORT as any) || 3000;



    (async () => {
        await connectDB();
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
       })();




       