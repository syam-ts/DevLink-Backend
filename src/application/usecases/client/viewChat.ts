import { Chat } from "../../../domain/entities/Chat";

 

export interface ChatRepositary { 
    viewChat(chatId: string): Promise< Chat>;
}

export class ViewChat {
    constructor(private chatRepositary: ChatRepositary) {}

    async execute(chatId: string) {   
        

        const foundedChat = await this.chatRepositary.viewChat(chatId)

       return foundedChat;  
      
    }
}