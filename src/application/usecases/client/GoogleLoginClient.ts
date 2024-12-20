import { Client } from '../../../domain/entities/Client';

export interface ClientRepositary {
    createClient(client: Client): Promise<Client>;
    findClientByOnlyEmail(email: string, name: string): Promise<Client | null>;
}

export class GoogleLoginClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(client: Client) {  
        const {email, name} = client;  
        const existingClient = await this.clientRepositary.findClientByOnlyEmail(email, name);

        if(existingClient) {
            console.log('client Found')
            return (
                existingClient
            )
        }

        return this.clientRepositary.createClient(client);
    }
}