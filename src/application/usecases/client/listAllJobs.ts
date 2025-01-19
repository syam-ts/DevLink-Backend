

export interface ClientRepository {
    findAllJobs(): Promise <any>
};


export class ListAllJobsClient {
    constructor( private clientRepository: ClientRepository) {};

    async execute() {
        const client = await this.clientRepository.findAllJobs();
 
        return client;
    }
}