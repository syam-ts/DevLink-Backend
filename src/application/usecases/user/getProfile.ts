

export interface UserRepositary {
    findUserById(userId: string): Promise< any >
}

 


export class GetUserProfile {
    constructor(private userRepositary: UserRepositary) {}

   async execute(userId: string) {
        const user = await this.userRepositary.findUserById(userId); 
        if(!user) {
            throw new Error('User not found')
        }

        return user;
    }
}