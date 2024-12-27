import { User } from '../../../domain/entities/User';

export interface UserRepositary {
    createUser(user: User): Promise<User>;
    verifyOtp(user: User): Promise<User>; 
}

export class verifyOtp {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {   
      

        
          const verifiedOtp = await this.userRepositary.verifyOtp(user);
 
          
    }
}