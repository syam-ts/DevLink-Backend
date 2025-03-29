import { Client } from '../../../domain/entities/Client';

export interface ClientRepositary {
   
    verifyOtp(client: {mailOtp: number,user:{otp: string,data:{name: string, email: string, password: string}}}): 
    Promise<Client | null>; 
}

export class verifyOtpClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(client: Client) {     
 
          const verifiedOtp = await this.clientRepositary.verifyOtp(client); 
          return verifiedOtp
    }
}