 


export interface UserRepositary {
    bestMatches(userId: string): Promise< any >
} 



export class BestMatches {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {  
        console.log('The usecase USER ID : ', userId)

           const response = await this.userRepositary.bestMatches(userId); 
            
           console.log('THE RESULT FROM CTRL : ', response)

           return response;
    }
}