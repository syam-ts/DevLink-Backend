

export interface UserRepositary {
    createProposal(userId: string, clientId: string, description: string): Promise< any >
} 



export class CreateProposal {
    constructor(private userRepositary: UserRepositary) {}

    async execute(userId: string, clientId: string, description: string) {  

           const result = await this.userRepositary.createProposal(userId, clientId, description); 
            

           return {   };
    }
}