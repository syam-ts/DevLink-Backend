// import { User } from "../../../domain/entities/User";
import nodemailer from "nodemailer";
import generateOtp from "../../../utils/otp-gen";

interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    mobile: number,
}

export interface UserRepository {
    findUserByEmail(email: string): Promise<User | null>;
}

const sendMail = async (toMail: string, userId: string | unknown) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "syamnandhu3@gmail.com",
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        //generates new otp's
        const otp: number = generateOtp();

        const info = await transporter.sendMail({
            from: "syamnandhu3@gmail.com",
            to: toMail,
            subject: "Verified Email for password changing",
            // text: `https://dev-link-frontend.vercel.app/resetPassword/${userId}?role=user`,
            text: `${process.env.FRONTEND_ORIGIN}/resetPassword/${userId}?role=user`,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export class VerifyEmail {
    constructor(private userRepository: UserRepository) { }

    async execute(email: string) {
        const foundUser = await this.userRepository.findUserByEmail(email);

        if (!foundUser) {
            throw new Error("User not founded");
        }

        sendMail(foundUser.email, foundUser._id);
        return foundUser._id;
    }
}
