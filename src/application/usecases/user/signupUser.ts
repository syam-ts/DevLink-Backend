import { User } from '../../../domain/entities/User';

export interface UserRepositary {
    createUser(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}

export class SignupUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute(user: User) {
        const existigUser = await this.userRepositary.findUserByEmail(user.email);
        if(existigUser) {
            throw new Error('Email already Exists');
        }

        return this.userRepositary.createUser(user);
    }
}