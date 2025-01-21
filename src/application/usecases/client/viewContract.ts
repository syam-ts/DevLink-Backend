 
 

export interface ClientRepository {
    viewContract(contractId: string): Promise <any>
};


export class ViewContract {
    constructor( private clientRepository: ClientRepository) {};

    async execute(contractId: string) {
        const response = await this.clientRepository.viewContract(contractId);
 
        return response;
    }
}