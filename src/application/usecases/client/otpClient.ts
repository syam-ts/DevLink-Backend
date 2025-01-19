import { Client } from '../../../domain/entities/Client';

export interface ClientRepositary {
    createClient(client: Client): Promise<Client>;
    verifyOtp(client: Client): Promise<Client>; 
}

export class verifyOtpClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(client: Client) {    
 
          const verifiedOtp = await this.clientRepositary.verifyOtp(client); 
          return verifiedOtp
    }
}