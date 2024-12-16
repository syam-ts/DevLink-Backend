import { User } from '../../../domain/entities/User';
import jwt from 'jsonwebtoken';

export interface UserRepositary {
    findUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {
        const { email, password }: any = user;
        
        const foundUser = await this.userRepositary.findUserByEmailAndPassword(email, password);

        const secret = 'devLink$auth123';
       
        const token = await jwt.sign({user}, secret);
        const cookie = token;
        
        if(!foundUser) {
            throw new Error('User not Found');
        } else {
            console.log('user Found')
        }

        return { cookie };
    }
}