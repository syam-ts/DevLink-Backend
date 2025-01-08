



export interface ClientRepository {
    getMyJobs(clientId: string): Promise <any>
};


export class GetMyJobs {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string) {
        const client = await this.clientRepository.getMyJobs(clientId);
 
        return client;
    }
}