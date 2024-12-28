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
        const USER_ACCESS_TOKEN: any = process.env.USER_ACCESS_TOKEN;
        const USER_REFRESH_TOKEN: any = process.env.USER_REFRESH_TOKEN;

        const userGoogleLogin: any = await this.userRepositary.findUserByOnlyEmail(email, name, password);
 

        const accessToken = await jwt.sign({
             name: userGoogleLogin.name, email: userGoogleLogin.email 
            }, 
              USER_ACCESS_TOKEN,
             { expiresIn: "10m" }
            );

            
            const refreshToken = await jwt.sign({
                name: userGoogleLogin.name, email: userGoogleLogin.email
            },
             USER_REFRESH_TOKEN,
            { expiresIn: '7d'}        
          )


        if(!accessToken) {
            throw new Error('unknown token ')
        }
        return { user: userGoogleLogin, jwt: refreshToken }; 
 
    }
}


  