import { Client } from '../../../domain/entities/Client';
import jwt from 'jsonwebtoken';

export interface ClientRepositary {
    findClientByEmailAndPassword(email: string, password: string): Promise<Client | null>;
}

export class LoginClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(client: any) {   

        const CLIENT_ACCESS_TOKEN: any = process.env.CLIENT_ACCESS_TOKEN;
        const CLIENT_REFRESH_TOKEN: any = process.env.CLIENT_REFRESH_TOKEN;
        
        const foundClient: any = await this.clientRepositary.findClientByEmailAndPassword(client.email, client.password);
 
        
        if (!foundClient) {
            throw new Error('Client not Found');
        }  


        const accessToken = await jwt.sign({
             name: foundClient.name, email: foundClient.email 
            }, 
              CLIENT_ACCESS_TOKEN,
             { expiresIn: "10m" }
            );

            
            const refreshToken = await jwt.sign({
                name: foundClient.name, email: foundClient.email
            },
             CLIENT_REFRESH_TOKEN,
            { expiresIn: '7d'}        
          )


        if(!accessToken) {
            throw new Error('unknown token ')
        }
        return { client: foundClient, jwt: refreshToken };
 
        
        
    }
}