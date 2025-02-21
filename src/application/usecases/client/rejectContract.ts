

export interface ClientRepository {
    rejectContract(contractId: string, clientId: string): Promise <any>
};


export class RejectContract {
    constructor( private clientRepository: ClientRepository) {};

    async execute(contractId: string, clientId: string) {
        const client = await this.clientRepository.rejectContract(contractId, clientId);
 
        return client;
    }
}