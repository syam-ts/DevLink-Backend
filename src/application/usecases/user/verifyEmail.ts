import { User } from '../../../domain/entities/User';
import nodemailer from 'nodemailer';
import generateOtp  from '../../../utils/otp-gen'; 

 
export interface UserRepositary {
    findUserByEmail(email: string): Promise<User | null>;
}



  const sendMail = async (toMail: string, userId: any) => {
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
          text: `http://localhost:5173/user/resetPassword/${userId}`,
      });
   
       
  } catch (error) {
      console.error('Error sending email:', error);
        } 
  } 
 
export class VerifyEmail {
     constructor(private userRepositary: UserRepositary) {}
       
    async execute(email: string) {
        const foundUser = await this.userRepositary.findUserByEmail(email); 

        if(!foundUser) {
            throw new Error('User not founded');
        }

        sendMail(foundUser.email, foundUser._id);
      

        return foundUser._id;
     }
}





 
