import { User } from '../../../domain/entities/User';

export interface AdminRepositary {
    blockUser(userId: string): Promise< any >;
}


export class BlockUser {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute (user: any) {
    const { userId } = user;
        const blockedUser = await this.adminRepositary.blockUser(userId); 
 
        
        return blockedUser
   }
}