
 

export interface ClientRepository {
    myContracts(clientId: string): Promise <any>
};


export class MyContracts {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string) {
        const contracts = await this.clientRepository.myContracts(clientId);
 
        return contracts;
    }
}