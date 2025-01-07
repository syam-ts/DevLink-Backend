import { Client } from '../../../domain/entities/Client';
import jwt from 'jsonwebtoken';

export interface ClientRepositary {
    findClientByEmailAndPassword(email: string, password: string): Promise<Client | null>;
}

export class LoginClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(client: any) {   

        
        const foundClient: any = await this.clientRepositary.findClientByEmailAndPassword(client.email, client.password);
 
   
        return { client: foundClient };
  
        
    }
}