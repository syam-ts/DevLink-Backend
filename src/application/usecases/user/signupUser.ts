import { sendMail } from "../../../utils/send-mail";

interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    mobile: number;
}

export interface UserRepositary {
    createUser(user: User): Promise<User>;
    signupUser(email: string): Promise<User | null>;
}

export class SignupUser {
    constructor(private userRepositary: UserRepositary) { }

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
