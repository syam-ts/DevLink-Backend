 

export interface ChatRepository {
    getAllChats(roleId: string): void
};


export class GetAllChats {
    constructor( private chatRepository: ChatRepository) {};

    async execute(roleId: string) {
        const chats = await this.chatRepository.getAllChats(roleId);
 
        return chats;
    }
}