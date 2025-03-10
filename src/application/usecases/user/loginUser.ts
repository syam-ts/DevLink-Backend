export interface UserRepositary {
    findUserByEmailAndPassword(
        email: string,
        password: string
    ): Promise<User | null>;
}

interface User {
    user: User;
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export class LoginUser {
    constructor(private userRepositary: UserRepositary) { }

    async execute(theUser: User) {
        const user = await this.userRepositary.findUserByEmailAndPassword(
            theUser.email,
            theUser.password
        );

        if (!user) {
            throw new Error("User not Found");
        }

        return user;
    }
}
