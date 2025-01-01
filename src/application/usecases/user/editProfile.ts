

export interface UserRepositary {
    editUserProfile(userId: string, editData: any): Promise< any >
} 



export class EditUserProfile {
    constructor(private userRepositary: UserRepositary) {}

    async execute(userId: string, editData: any) { 
           const updatedUser = await this.userRepositary.editUserProfile(userId, editData); 
           if(!updatedUser) {
            throw new Error('Profile editing failed');
           }

           return { updatedUser };
    }
}