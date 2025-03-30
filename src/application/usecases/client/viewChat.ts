 

export interface ChatRepositary { 
    viewChat(roleType: string, roleId: string, targetId: string, roleName: string): Promise< unknown>;
}

export class ViewChat {
    constructor(private chatRepositary: ChatRepositary) {}

    async execute(roleType: string, roleId: string, targetId: string, roleName: string) {   
        

        const foundedChat = await this.chatRepositary.viewChat(roleType, roleId, targetId, roleName)

       return foundedChat;  
      
    }
}