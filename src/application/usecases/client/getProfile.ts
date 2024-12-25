

export interface ClientRepository {
    getClientProfile(clientId: string): Promise <any>
};


export class GetClientProfile {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string) {
        const client = await this.clientRepository.getClientProfile(clientId);

        console.log('The result from usecase', client)
        return client;
    }
}