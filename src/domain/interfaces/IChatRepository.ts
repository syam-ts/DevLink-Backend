import { IChat } from "../entities/Chat";

interface Message {
    chatId: string;
    sender: string;
    text: string;
    read: boolean;
    roleType: string;
}

export interface IChatRepository {
    getAllChats(roleId: string): Promise<IChat>;

    viewChat(
        roleType: string,
        roleId: string,
        targetId: string
    ): Promise<unknown>;

    sendMessage(body: Message): Promise<IChat>;
}
