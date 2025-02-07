 

export interface ChatRepository {
    getAllChats(roleId: string): Promise <any>
};


export class GetAllChats {
    constructor( private chatRepository: ChatRepository) {};

    async execute(roleId: string) {
        const chats = await this.chatRepository.getAllChats(roleId);
 
        return chats;
    }
}