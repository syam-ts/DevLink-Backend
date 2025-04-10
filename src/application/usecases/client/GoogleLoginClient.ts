 
interface Client {
    _id: string
    email: string;
    companyName: string;
    password: string;
    role?: string
  }

interface ClientData {
    email: string
    name: string
    password: string
}
  
export interface ClientRepository { 
    findClientByOnlyEmail(
        email: string,
        name: string | undefined,
        password: string | undefined
    ): Promise<Client>;
}

export class GoogleLoginClient {
    constructor(private clientRepository: ClientRepository) { }

    async execute(client: ClientData) { 
        const { email, password } = client; 
        const companyName = client.name; 

        const clientGoogleLogin = await this.clientRepository.findClientByOnlyEmail(
            email,
            companyName,
            password
        );

        return clientGoogleLogin;
    }
}
