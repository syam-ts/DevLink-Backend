import { User } from '../../../domain/entities/User';
import { sendMail } from '../../../utils/send-mail';

export interface UserRepositary {
    createUser(user: User): Promise<User>;
    signupUser(email: string): Promise<User | null>;
}

export class SignupUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User | any) {   
        

        const existingUser:any = await this.userRepositary.signupUser(user)

        
        if(existingUser) {
            throw new Error('User already exists');
        } else {
              
            const otp = await sendMail(user.email);
 

            return otp;
        }
 
      
    }
}