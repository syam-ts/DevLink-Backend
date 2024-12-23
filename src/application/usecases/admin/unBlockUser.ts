 
export interface AdminRepositary {
    unBlockUser(userId: string): Promise< any >;
}


export class UnBlockUser {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute (user: any) {
    const { userId } = user;
        const blockedUser = await this.adminRepositary.unBlockUser(userId); 
 
        
        return blockedUser
   }
}