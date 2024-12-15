import { User } from '../../../domain/entities/User';

export interface UserRepositary {
    createUser(user: User): Promise<User>;
    findUserByOnlyEmail(email: string, name: string): Promise<User | null>;
}

export class GoogleLoginUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {   
        const existigUser = await this.userRepositary.findUserByOnlyEmail(user.email, user.name);

        if(existigUser) {
            console.log('User Found')
        }

        return this.userRepositary.createUser(user);
    }
}