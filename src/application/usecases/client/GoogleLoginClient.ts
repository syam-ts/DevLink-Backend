import { Client } from "../../../domain/entities/Client";

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
        console.log('THe c: ',client)
        const { email, password } = client; 
        const companyName = client.name;
        console.log('THe name: ',companyName)

        const clientGoogleLogin = await this.clientRepository.findClientByOnlyEmail(
            email,
            companyName,
            password
        );

        return clientGoogleLogin;
    }
}
