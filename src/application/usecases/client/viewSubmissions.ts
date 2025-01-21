

 

export interface ClientRepository {
    viewSubmissions(clientId: string): Promise <any>
};


export class ViewSubmissions {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string) {
        const response = await this.clientRepository.viewSubmissions(clientId);
 
        return response;
    }
}