interface Client { 
    _id: string 
    companyName: string
    email: string
    password: string
    isBlocked: boolean 
    role?: string
}

export interface ClientRepositary {
    findClientByEmailAndPassword(
        email: string,
        password?: string
    ): Promise<Client>;
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
