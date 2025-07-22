import { IClient } from "../../../domain/entities/Client";
import { sendMail } from "../../../utils/send-mail";

export interface ClientRepositary {
    createClient(client: IClient): Promise<IClient>;
    signupClient(email: string): Promise<IClient | null>;
}

export class SignupClient {
    constructor(private clientRepositary: ClientRepositary) { }

    async execute(client: IClient) {
        const existingClient = await this.clientRepositary.signupClient(client.email); 

        if (existingClient) {
            throw new Error("Client already exists");
        } else {
            const otp = await sendMail(client.email);

            return otp;
        }
    }
}
