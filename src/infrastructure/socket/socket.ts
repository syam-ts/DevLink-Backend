import { Server } from 'socket.io';
import http from 'node:http';
import express from 'express';

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  },
});

export { server, app };
