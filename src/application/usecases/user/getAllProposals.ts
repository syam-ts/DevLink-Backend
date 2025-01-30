
 

export interface UserRepositary {
    getAllProposals(userId: string): Promise< any >
} 



export class GetAllProposals {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {   

           const response = await this.userRepositary.getAllProposals(userId); 
            
    

           return response;
    }
}