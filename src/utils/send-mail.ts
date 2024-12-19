import nodemailer from 'nodemailer';
import { otp } from './otp-gen';


export const sendMail = async (toMail: string) => {
  try {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'syamnandhu3@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });
 

    const info = await transporter.sendMail({
        from: 'syamnandhu3@gmail.com',
        to: toMail,
        subject: 'DevLink OTP Verification',
        text: `Your OTP is : ${otp}`,
    });

    console.log('OTP sent', info.messageId);
    return otp;
} catch (error) {
    console.error('Error sending email:', error);
}

} 