 

export interface ChatRepository {
    getAllChats(memberId: string): Promise <any>
};


export class GetAllChats {
    constructor( private chatRepository: ChatRepository) {};

    async execute(memberId: string) {
        const chats = await this.chatRepository.getAllChats(memberId);
 
        return chats;
    }
}