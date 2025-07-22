 
import bcrypt from "bcrypt";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
 

export class ResetPassword {
    constructor(private userRepositary: IUserRepository) { }

    async execute(id: string, password: string) {
        const salt: number = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const resetPassword = await this.userRepositary.resetPassword(
            id,
            hashedPassword
        );

        return {};
    }
}
