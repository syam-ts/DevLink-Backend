 

export interface UserRepository {
    allNotifications(userId: string): Promise< any >
} 



export class AllNotifications {
    constructor(private userRepository: UserRepository) {}

    async execute( userId: string ) {   

           const response = await this.userRepository.allNotifications(userId); 
             

           return response;
    }
}