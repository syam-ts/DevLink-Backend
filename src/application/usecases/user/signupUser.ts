import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { sendMail } from "../../../utils/send-mail";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    mobile: number;
}

export class SignupUser {
    constructor(private userRepositary: IUserRepository) { }

    async execute(user: User) {
        const existingUser = await this.userRepositary.signupUser(user.email);

        if (existingUser) {
            throw new Error("User already exists");
        } else {
            const otp = await sendMail(user.email);

            return otp;
        }
    }
}
