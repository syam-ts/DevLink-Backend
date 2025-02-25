 

export interface UserRepository {
    allContracts(userId: string): Promise< any >
} 



export class AllContracts {
    constructor(private userRepository: UserRepository) {}

    async execute( userId: string ) {   

           const response = await this.userRepository.allContracts(userId); 
            
    

           return response;
    }
}