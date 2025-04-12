import { Client } from '../../../domain/entities/Client';
import nodemailer from 'nodemailer';
import generateOtp  from '../../../utils/otp-gen'; 

 
export interface ClientRepositary {
    findClientByEmail(email: string): Promise<Client | null>;
}



  const sendMail = async (toMail: string, clientId: string | unknown) => {
    try {
  
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'syamnandhu3@gmail.com',
              pass: process.env.GMAIL_APP_PASSWORD
          }
      });
  
      //generates new otp's
      const otp = generateOtp(); 
  
      const info = await transporter.sendMail({
          from: 'syamnandhu3@gmail.com',
          to: toMail,
          subject: 'Verified Email for password changing',
          text: `https://dev-link-frontend.vercel.app/resetPassword/${clientId}?role=client`,
      });
   
       
  } catch (error) {
      console.error('Error sending email:', error);
        } 
  } 
 
export class VerifyEmailClient {
     constructor(private clientRepositary: ClientRepositary) {}
       
    async execute(email: string) {
        const foundClient = await this.clientRepositary.findClientByEmail(email); 

        if(!foundClient) {
            throw new Error('client not founded');
        }

        sendMail(foundClient.email, foundClient._id);
      

        return foundClient._id;
     }
}





 
