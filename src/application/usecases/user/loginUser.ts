import { User } from '../../../domain/entities/User';

export interface UserRepositary {
    findUserByEmail(email: string): Promise<User | null>;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {

        const foundUser = await this.userRepositary.findUserByEmail(user.email);
         
        if(!foundUser) {
            throw new Error('User not Found');
        } else {
            console.log('user Found')
        }

        return user;
    }
}