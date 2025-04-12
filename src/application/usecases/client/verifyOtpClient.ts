import { Client } from "../../../domain/entities/Client";

export interface ClientRepositary {
    verifyOtp(client: {
        mailOtp: number;
        userOtp: string;
        user: {
            otp: string;
            data: { name: string; email: string; password: string };
        };
    }): Promise<Client>;
}

export class verifyOtpClient {
    constructor(private clientRepositary: ClientRepositary) { }

    async execute(client: {
        mailOtp: number;
        userOtp: string;
        user: {
            otp: string;
            data: { name: string; email: string; password: string };
        };
    }) {
        const verifiedOtp = await this.clientRepositary.verifyOtp(client);
        return verifiedOtp;
    }
}
