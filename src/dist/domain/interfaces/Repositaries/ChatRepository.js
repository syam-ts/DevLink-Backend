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
exports.ChatRepositoryMongoose = void 0;
const Chat_1 = require("../../../domain/entities/Chat");
const Message_1 = require("../../entities/Message");
const User_1 = require("../../entities/User");
const Client_1 = require("../../entities/Client");
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
class ChatRepositoryMongoose {
    getAllChats(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allChats = yield Chat_1.ChatModel.find({ members: roleId }).lean().exec();
            if (!allChats)
                throw new Error("No chats found");
            return allChats;
        });
    }
    viewChat(roleType, roleId, targetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let chat = yield Chat_1.ChatModel.findOne({
                members: { $all: [roleId, targetId] }
            });
            if (!chat) {
                const client = yield Client_1.ClientModel.findOne({ $or: [{ _id: roleId }, { _id: targetId }] });
                const user = yield User_1.UserModel.findOne({ $or: [{ _id: roleId }, { _id: targetId }] });
                if (!client)
                    throw new Error('');
                if (!user)
                    throw new Error('');
                chat = new Chat_1.ChatModel({
                    members: [roleId, targetId],
                    userData: {
                        userName: user.name,
                        profilePicture: user.profilePicture
                    },
                    clientData: {
                        companyName: client.companyName,
                        profilePicture: ""
                    },
                    messages: []
                });
            }
            yield chat.save();
            return chat;
        });
    }
    sendMessage(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chatId, sender, text, roleType } = body;
            const newMessage = new Message_1.MessageModel({
                chatId: chatId,
                sender: sender,
                text: text,
            });
            const savedMessage = yield newMessage.save();
            // insert message inot chat
            if (roleType === 'client') {
                const updateChat = yield Chat_1.ChatModel.findByIdAndUpdate(chatId, {
                    $push: {
                        "chatHistory.clientChat": {
                            text: text,
                            createdAt: new Date(),
                        },
                    },
                }, {
                    new: true,
                    upsert: true,
                }).sort({ "chatHistory.clientChat.createdAt": 1 }).lean();
                return updateChat;
            }
            else {
                const updateChat = yield Chat_1.ChatModel.findByIdAndUpdate(chatId, {
                    $push: {
                        "chatHistory.userChat": {
                            text: text,
                            createdAt: new Date(),
                        },
                    },
                }, {
                    new: true,
                    upsert: true,
                }).sort({ "chatHistory.useChat.createdAt": 1 }).lean();
                return updateChat;
            }
        });
    }
}
exports.ChatRepositoryMongoose = ChatRepositoryMongoose;
