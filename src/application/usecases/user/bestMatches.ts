 


export interface UserRepositary {
    bestMatches(userId: string): Promise< any >
} 



export class BestMatches {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {   

           const response = await this.userRepositary.bestMatches(userId); 
             

           return response;
    }
}