import { Client } from '../../../domain/entities/Client';
import jwt from 'jsonwebtoken';

export interface ClientRepositary {
    findClientByEmailAndPassword(email: string, password: string): Promise<Client | null>;
}

export class LoginClient {
    constructor(private ClientRepositary: ClientRepositary) {}

    async execute(client: Client) {
        const { email, password }: any = client;
        
        const foundClient: any = await this.ClientRepositary.findClientByEmailAndPassword(email, password);

        const secret = 'devLink$auth123';
  
       
        const token = await jwt.sign({name: foundClient.name, email: foundClient.email}, secret, { expiresIn: "7d"});
        
        if(!foundClient) {
            throw new Error('Client not Found');
        } else {
            console.log('Client Found')
        }

        return { token };
    }
}