 
import bcrypt from 'bcrypt';
 

export interface ClientRepositary {
    resetPassword(email: string, password: string): Promise<string>;
}

export class ResetPasswordClient {
    constructor(private clientRepositary: ClientRepositary) {}

    async execute(id :string, password: string) {   
  
            const salt: number = 10;
            const hashedPassword = await bcrypt.hash(password, salt);

        const resetPassword = await this.clientRepositary.resetPassword(id , hashedPassword); 
       
        return {};
  
        
    }
}