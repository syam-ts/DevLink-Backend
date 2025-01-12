 

export interface UserRepositary {
    allNotifications(userId: string): Promise< any >
} 



export class AllNotifications {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {  
        console.log('The usecase USER ID : ', userId)

           const response = await this.userRepositary.allNotifications(userId); 
            
         console.log('THE RESPONSE FORM USECSE', response)

           return response;
    }
}