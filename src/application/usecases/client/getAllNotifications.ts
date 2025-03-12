import { Notification } from "../../../domain/entities/Notification";

export interface ClientRepository {
    getAllNotifications(clientId: string): Promise<Notification>;
}

export class GetAllNotifications {
    constructor(private clientRepository: ClientRepository) { }

    async execute(clientId: string) {
        const client = await this.clientRepository.getAllNotifications(clientId);

        return client;
    }
}
