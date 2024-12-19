import { User } from '../../../domain/entities/User';
import jwt from 'jsonwebtoken';

export interface UserRepositary {
    findUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: any) { 
       
        
        const foundUser: any = await this.userRepositary.findUserByEmailAndPassword(user.email, user.password);

        console.log('the user', foundUser)
        if (!foundUser) {
            throw new Error('User not Found');
        }  

        const secret = 'devLink$auth123';
        const token = await jwt.sign({ name: foundUser.name, email: foundUser.email }, secret, { expiresIn: "1d" });

        if(!token) {
            throw new Error('unknown token ')
        }
        return { user: foundUser, token: token };
 
        
        
    }
}