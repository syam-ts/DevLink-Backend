import { User } from '../../../domain/entities/User';

export interface UserRepositary {
    createUser(user: User): Promise<User>;
    findUserByOnlyEmail(email: string, name: string): Promise<User | null>;
}

export class GoogleLoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {  
        const {email, name} = user;  
        const existigUser = await this.userRepositary.findUserByOnlyEmail(email, name);

        if(existigUser) {
            console.log('User Found')
            return (
                existigUser
            )
        }

        return this.userRepositary.createUser(user);
    }
}