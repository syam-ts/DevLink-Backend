 

export interface ClientRepository {
    getAllNotifications(clientId: string): Promise <any>
};


export class GetAllNotifications {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string) {
        const client = await this.clientRepository.getAllNotifications(clientId);

        console.log('The result from usecase', client)
        return client;
    }
}