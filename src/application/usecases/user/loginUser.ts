import { User } from '../../../domain/entities/User';
import jwt from 'jsonwebtoken';

export interface UserRepositary {
    findUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: any) {   

        const USER_ACCESS_TOKEN: any = process.env.USER_ACCESS_TOKEN;
        const USER_REFRESH_TOKEN: any = process.env.USER_REFRESH_TOKEN;
        
        const foundUser: any = await this.userRepositary.findUserByEmailAndPassword(user.email, user.password);
 
        if (!foundUser) {
            throw new Error('User not Found');
        }  


        const accessToken = await jwt.sign({
             name: foundUser.name, email: foundUser.email 
            }, 
              USER_ACCESS_TOKEN,
             { expiresIn: "10m" }
            );

            
            const refreshToken = await jwt.sign({
                name: foundUser.name, email: foundUser.email
            },
             USER_REFRESH_TOKEN,
            { expiresIn: '7d'}        
          )


        if(!accessToken) {
            throw new Error('unknown token ')
        }
        return { user: foundUser, jwt: refreshToken };
 
        
        
    }
}