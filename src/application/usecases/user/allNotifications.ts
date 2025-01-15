 

export interface UserRepositary {
    allNotifications(userId: string): Promise< any >
} 



export class AllNotifications {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {   

           const response = await this.userRepositary.allNotifications(userId); 
             

           return response;
    }
}