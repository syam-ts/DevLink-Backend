

export interface ClientRepository {
    findAllJobs(): Promise <any>
};


export class ListAllJobs {
    constructor( private clientRepository: ClientRepository) {};

    async execute() {
        const client = await this.clientRepository.findAllJobs();
 
        return client;
    }
}