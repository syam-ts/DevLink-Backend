export interface UserRepository {
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
    constructor(private userRepository: UserRepository) { }

    async execute(theUser: User) {
        const user = await this.userRepository.findUserByEmailAndPassword(
            theUser.email,
            theUser.password
        );

        if (!user) {
            throw new Error("User not Found");
        }

        return user;
    }
}
