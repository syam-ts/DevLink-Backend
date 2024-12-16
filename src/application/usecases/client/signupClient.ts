import { Client } from '../../../domain/entities/Client';

export interface ClientRepositary {
    createClient(client: Client): Promise<Client>;
    findClientByEmail(email: string): Promise<Client | null>;
}

export class SignupClient {
    constructor(private ClientRepositary: ClientRepositary) {}

    async execute(client: Client) {   
        const existigClient = await this.ClientRepositary.findClientByEmail(client.email);

        if(existigClient) {
            throw new Error('Email already Exists');
        }

        return this.ClientRepositary.createClient(client);
    }
}