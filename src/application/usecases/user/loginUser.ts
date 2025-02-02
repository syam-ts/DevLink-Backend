import { User } from '../../../domain/entities/User';
 

export interface UserRepositary {
    findUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(theUser: any) {   
  
 
        const user: any = await this.userRepositary.findUserByEmailAndPassword(theUser.email, theUser.password);
  
        if (!user) {
            throw new Error('User not Found');
        }  
 
       return user; 
    }
}