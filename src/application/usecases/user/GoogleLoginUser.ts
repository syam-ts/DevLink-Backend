import { User } from '../../../domain/entities/User';
import jwt from 'jsonwebtoken';

export interface UserRepositary {
    createUser(user: User): Promise<User>;
    findUserByOnlyEmail(email: string, name: string, password: any): Promise<User | null>;
}

export class GoogleLoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {  
        const {email, name, password} = user;   

        const userGoogleLogin: any = await this.userRepositary.findUserByOnlyEmail(email, name, password);
  
        return userGoogleLogin; 
 
    }
}


  