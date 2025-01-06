 
export interface AdminRepositary {
    unBlockUser(userId: string): Promise< any >;
    unBlockClient(clientId: string): Promise< any >;
}


export class UnBlockUser {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute (user: any) {
    const { userId } = user;
        const blockedUser = await this.adminRepositary.unBlockUser(userId); 
 
        
        return blockedUser
   }
}


export class UnBlockClient {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute (client: any) {
    const { clientId } = client;
        const blockedClient = await this.adminRepositary.unBlockClient(clientId); 
 
        
        return blockedClient
   }
}