export interface Message {
    chatId: string;
    sender: string;
    text: string;
    read: boolean;
}

export interface ChatRepository {
    sendMessage(body: Message): void;
}

export class SendMessage {
    constructor(private chatRepository: ChatRepository) { }

    async execute(body: Message) {
        const message = await this.chatRepository.sendMessage(body);

        return message;
    }
}
