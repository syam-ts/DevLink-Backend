import { User } from '../../../domain/entities/User';

export interface UserRepositary {
    findUserByEmailAndPassword(email: string, password: string): Promise<User | null>;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {
        const { email, password } = user;
        
        const foundUser = await this.userRepositary.findUserByEmailAndPassword(email, password);
        console.log('The founded user', foundUser)
         
        if(!foundUser) {
            throw new Error('User not Found');
        } else {
            console.log('user Found')
        }

        return user;
    }
}