type Id = string;
export interface UserRepositary {
    createProposal(userId: Id, jobPostId: Id, description: Id, bidAmount: number, bidDeadline: number): Promise< any >
} 



export class CreateProposal {
    constructor(private userRepositary: UserRepositary) {}

    async execute(userId: Id, jobPostId: Id, description: Id, bidAmount: number, bidDeadline: number) {  
        

           const result = await this.userRepositary.createProposal( userId, jobPostId, description, bidAmount, bidDeadline); 
            

           return result ;
    }
}