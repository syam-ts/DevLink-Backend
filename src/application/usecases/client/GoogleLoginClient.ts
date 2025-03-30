import { Client } from "../../../domain/entities/Client";

 

export interface ClientRepository {
    createClient(client: Client): Promise<Client>;
    findClientByOnlyEmail(
        email: string,
        companyName: string | undefined,
        password: string | undefined
    ): Promise<Client>;
}

export class GoogleLoginClient {
    constructor(private clientRepository: ClientRepository) { }

    async execute(client: Client) {
        const { email, companyName, password } = client;

        const clientGoogleLogin = await this.clientRepository.findClientByOnlyEmail(
            email,
            companyName,
            password
        );

        return clientGoogleLogin;
    }
}
