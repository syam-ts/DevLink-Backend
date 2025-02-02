import { Client } from '../../../domain/entities/Client';
import jwt from 'jsonwebtoken';

export interface ClientRepositary {
    findClientByEmailAndPassword(email: string, password: string): Promise<Client | null>;
}

export class LoginClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(clientData: any) {   

        
        const client: any = await this.clientRepositary.findClientByEmailAndPassword(clientData.email, clientData.password);
 
   
        return client; 
  
        
    }
}