 

export interface ClientRepository {
    allUser(): Promise <any>
};


export class AllUser {
    constructor( private clientRepository: ClientRepository) {};

    async execute() {
        const jobs = await this.clientRepository.allUser();
 
        return jobs;
    }
}