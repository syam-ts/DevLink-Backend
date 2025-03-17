interface Client {
    email: string;
    name: string;
    password: string;
}

export interface ClientRepository {
    createClient(client: Client): Promise<Client>;
    findClientByOnlyEmail(
        email: string,
        name: string,
        password: string
    ): Promise<Client | null>;
}

export class GoogleLoginClient {
    constructor(private clientRepository: ClientRepository) { }

    async execute(client: Client) {
        const { email, name, password } = client;

        const clientGoogleLogin = await this.clientRepository.findClientByOnlyEmail(
            email,
            name,
            password
        );

        return clientGoogleLogin;
    }
}
