import { Chat } from "../../../domain/entities/Chat";

 

export interface ChatRepositary { 
    viewChat(roleId: string, targetId: string, roleName: string): Promise< Chat>;
}

export class ViewChat {
    constructor(private chatRepositary: ChatRepositary) {}

    async execute(roleId: string, targetId: string, roleName: string) {   
        

        const foundedChat = await this.chatRepositary.viewChat(roleId, targetId, roleName)

       return foundedChat;  
      
    }
}