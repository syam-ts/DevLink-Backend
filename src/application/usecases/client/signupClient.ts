import { Client } from "../../../domain/entities/Client";
import { sendMail } from "../../../utils/send-mail";

export interface ClientRepositary {
    createClient(client: Client): Promise<Client>;
    signupClient(email: string): Promise<Client | null>;
}

export class SignupClient {
    constructor(private clientRepositary: ClientRepositary) { }

    async execute(client: Client) {
        const existingClient = await this.clientRepositary.signupClient(client.email); 

        if (existingClient) {
            throw new Error("Client already exists");
        } else {
            const otp = await sendMail(client.email);

            return otp;
        }
    }
}
