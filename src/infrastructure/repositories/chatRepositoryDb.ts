import { IChat } from "../../domain/entities/Chat";
import { ChatModel } from "../database/Schema/chatSchema";
import { ClientModel } from "../database/Schema/clientSchema";
import { MessageModel } from "../database/Schema/messageSchema";
import { UserModel } from "../database/Schema/userSchema";

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

export class ChatRepositoryDb {
    async getAllChats(roleId: string): Promise<IChat> {
        const allChats = await ChatModel.find({ members: roleId })
            .lean<IChat>()
            .exec();

        if (!allChats) throw new Error("No chats found");
        return allChats;
    }

    async viewChat(
        roleType: string,
        roleId: string,
        targetId: string
    ): Promise<unknown> {
        let chat = await ChatModel.findOne({
            members: { $all: [roleId, targetId] },
        });

        if (!chat) {
            const client = await ClientModel.findOne({
                $or: [{ _id: roleId }, { _id: targetId }],
            });
            const user = await UserModel.findOne({
                $or: [{ _id: roleId }, { _id: targetId }],
            });
            if (!client) throw new Error("");
            if (!user) throw new Error("");
            chat = new ChatModel({
                members: [roleId, targetId],
                userData: {
                    userName: user.name,
                    profilePicture: user.profilePicture,
                },
                clientData: {
                    companyName: client.companyName,
                    profilePicture: "",
                },
                messages: [],
            });
        }

        await chat.save();
        return chat;
    }

    async sendMessage(body: Message): Promise<IChat> {
        const { chatId, sender, text, roleType }: Message = body;
        const newMessage = new MessageModel({
            chatId: chatId,
            sender: sender,
            text: text,
        });

        const savedMessage = await newMessage.save();

        // insert message inot chat
        if (roleType === "client") {
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
            )
                .sort({ "chatHistory.clientChat.createdAt": 1 })
                .lean<IChat>();

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
            )
                .sort({ "chatHistory.useChat.createdAt": 1 })
                .lean<IChat>();
            return updateChat;
        }
    }
}
