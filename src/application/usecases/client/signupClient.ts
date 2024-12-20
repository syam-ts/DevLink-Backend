import { Client } from '../../../domain/entities/Client';
import { sendMail } from '../../../utils/send-mail';

export interface ClientRepositary {
    createClient(client: Client): Promise<Client>;
    signupClient(email: string): Promise<Client | null>;
}

export class SignupClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(client: Client | any) {   
        

        const existingClient:any = await this.clientRepositary.signupClient(client)

        
        if(existingClient) {
            throw new Error('Client already exists');
        } else {
             
            console.log('the mail', client.email)
            const otp = await sendMail(client.email);  
            console.log('the opt',otp)

            return otp;
        } 
    }
}