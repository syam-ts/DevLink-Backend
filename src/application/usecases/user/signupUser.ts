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
        console.log('The whole user includes Email: ',user)
        const existingUser = await this.userRepositary.signupUser(user.email);

        if (existingUser) {
            throw new Error("User already exists");
        } else {
            console.log('Reachded here before')
            const otp = await sendMail(user.email);
            console.log('The email', user.email)

            return otp;
        }
    }
}
