import { ContractDocument } from "../../../domain/entities/Contract";


export interface ClientRepository {
    rejectContract(contractId: string, clientId: string): ContractDocument
};


export class RejectContract {
    constructor( private clientRepository: ClientRepository) {};

    async execute(contractId: string, clientId: string) {
        const client = await this.clientRepository.rejectContract(contractId, clientId);
 
        return client;
    }
}