interface User { 
    _id: string
    name: string
    email: string
    password: string
    profilePicture: string
    isBlocked: boolean
    isProfileFilled: boolean 
    role?: string;
}
export interface UserRepository {
    findUserByEmailAndPassword(
        email: string,
        password: string
    ): Promise<User>;
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
