import { Client } from '../../../domain/entities/Client';

export interface ClientRepositary {
    rejectProposal(clientId: string, userId: string, jobPostId: string): Promise<Client>; 
}

export class RejectProposal {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(clientId: string, userId: string, jobPostId: string) {    
 
          const result = await this.clientRepositary.rejectProposal(clientId, userId, jobPostId); 
        
          return result;
    }
}