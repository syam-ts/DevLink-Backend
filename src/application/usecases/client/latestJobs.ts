 

export interface ClientRepository {
    latestJobs(): Promise <any>
};


export class LatestJobs {
    constructor( private clientRepository: ClientRepository) {};

    async execute() {
        const jobs = await this.clientRepository.latestJobs();
 
        return jobs;
    }
}