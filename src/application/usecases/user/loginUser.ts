import { IUserRepository } from "../../../domain/interfaces/IUserRepository"

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
 

export class LoginUser {
    constructor(private userRepository: IUserRepository) { }

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
