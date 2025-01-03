

export interface UserRepositary {
    createProposal(userId: string, clientId: string, description: string): Promise< any >
} 



export class CreateProposal {
    constructor(private userRepositary: UserRepositary) {}

    async execute(clientId: string, userId: string, description: string) {  
        console.log('The usecase  : ', clientId, userId)

           const result = await this.userRepositary.createProposal( clientId, userId, description); 
            

           return {   };
    }
}