type Id = string;
export interface UserRepositary {
    createProposal(userId: Id, clientId: Id, jobPostId: Id, description: string): Promise< any >
} 



export class CreateProposal {
    constructor(private userRepositary: UserRepositary) {}

    async execute(clientId: Id, userId: Id,  jobPostId: Id, description: string) {  
        

           const result = await this.userRepositary.createProposal( clientId, userId, jobPostId,  description); 
            

           return {   };
    }
}