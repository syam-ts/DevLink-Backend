import { User } from '../../../domain/entities/User';
import bcrypt from 'bcrypt';
 

export interface UserRepositary {
    resetPassword(email: string, password: string): Promise<User | null>;
}

export class ResetPassword {
    constructor(private userRepositary: UserRepositary) {}

    async execute(id :string, password: string) {   
 

        console.log('id', id, 'pass', password)

            const salt: number = 10;
            const hashedPassword = await bcrypt.hash(password, salt);

        const resetPassword = await this.userRepositary.resetPassword(id , hashedPassword);

        console.log('From usecase : ', resetPassword);



       
        return {  };
  
        
    }
}