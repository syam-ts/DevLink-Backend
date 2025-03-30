"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = require("../../domain/entities/Chat");
const socket = require("socket.io");
const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "PATCH"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);
        socket.on("joinChat", ({ name, roleId, targetId }) => {
            const roomId = [roleId, targetId].sort().join("_");
            console.log(`User ${name} with ID ${roleId} joined chat with ${targetId}`);
            socket.join(roomId);
        });
        socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, roleType, roleId, targetId, text }) {
            try {
                const roomId = [roleId, targetId].sort().join("_");
                let chat = yield Chat_1.ChatModel.findOne({
                    members: { $all: [roleId, targetId] }
                });
                if (!chat) {
                    console.log('The memebers : ', roleId, roleType, name, targetId);
                    chat = new Chat_1.ChatModel({
                        members: [roleId, targetId],
                        messages: []
                    });
                }
                if (roleType === 'user') {
                    chat.messages.push({
                        senderId: roleId,
                        roleType,
                        name,
                        text
                    });
                }
                else if (roleType === 'client') {
                    chat.messages.push({
                        senderId: roleId,
                        roleType,
                        name,
                        text
                    });
                }
                else {
                    throw new Error('Role Type not specified');
                }
                yield chat.save();
                io.to(roomId).emit("messageReceived", { name, text, roleType });
            }
            catch (err) {
                console.log(err);
            }
        }));
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};
exports.default = initializeSocket;
