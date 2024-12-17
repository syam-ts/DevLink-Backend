import { User } from '../../../domain/entities/User';
import jwt from 'jsonwebtoken';

export interface UserRepositary {
    findUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) { }

    async execute(user: User) {
       try {
        const { email, password }: any = user;

        const foundUser: any = await this.userRepositary.findUserByEmailAndPassword(email, password);

       
        if (!foundUser) {
            console.log('User not Found');
        } else {
            console.log('user Found') 


        const secret = 'devLink$auth123';

        const token = await jwt.sign({ name: foundUser.name, email: foundUser.email }, secret, { expiresIn: "7d" });

        if(!token) {
            console.log('unknown token ')
        }
        return { token };

          }
       }
        catch (error) {
        console.log(error)
       }
    }
}