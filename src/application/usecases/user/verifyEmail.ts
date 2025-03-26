import { User } from "../../../domain/entities/User";
import nodemailer from "nodemailer";
import generateOtp from "../../../utils/otp-gen";

export interface UserRepository {
    findUserByEmail(email: string): Promise<User>;
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
            text: `http://localhost:5173/resetPassword/${userId}?role=user`,
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
