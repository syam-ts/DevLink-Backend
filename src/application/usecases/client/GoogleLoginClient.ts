import { Client } from '../../../domain/entities/Client';

export interface ClientRepositary {
    createClient(client: Client): Promise<Client>;
    findClientByOnlyEmail(email: string, name: string): Promise<Client | null>;
}

export class GoogleLoginClient {
    constructor(private ClientRepositary: ClientRepositary) {}

    async execute(client: Client) {  
        const {email, name} = client;  
        const existigClient = await this.ClientRepositary.findClientByOnlyEmail(email, name);

        if(existigClient) {
            console.log('Client Found')
            return (
                existigClient
            )
        }

        return this.ClientRepositary.createClient(client);
    }
}