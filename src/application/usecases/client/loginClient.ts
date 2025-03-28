import { Client } from "../../../domain/entities/Client";

export interface ClientRepositary {
    findClientByEmailAndPassword(
        email: string,
        password?: string
    ): Promise<Client | null>;
}

export class LoginClient {
    constructor(private clientRepositary: ClientRepositary) { }

    async execute(clientData: Client ) {
        const client = await this.clientRepositary.findClientByEmailAndPassword(
            clientData.email,
            clientData.password
        );

        return client;
    }
}
