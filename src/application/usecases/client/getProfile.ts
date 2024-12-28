

export interface ClientRepository {
    getClientProfile(clientId: string): Promise <any>
};


export class GetClientProfile {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string) {
        const client = await this.clientRepository.getClientProfile(clientId);
 
        return client;
    }
}