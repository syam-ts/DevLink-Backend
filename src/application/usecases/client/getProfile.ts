import { IClient } from "../../../domain/entities/Client";

 

export interface ClientRepository {
    getClientProfile(clientId: string): Promise<IClient>;
}

export class GetClientProfile {
    constructor(private clientRepository: ClientRepository) { }

    async execute(clientId: string) {
        const client = await this.clientRepository.getClientProfile(clientId);

        return client;
    }
}
