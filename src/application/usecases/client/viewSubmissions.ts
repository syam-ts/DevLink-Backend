import { Client } from "../../../domain/entities/Client";

export interface ClientRepository {
    viewSubmissions(clientId: string): Promise<Client>;
}

export class ViewSubmissions {
    constructor(private clientRepository: ClientRepository) { }

    async execute(clientId: string) {
        const response = await this.clientRepository.viewSubmissions(clientId);

        return response;
    }
}
