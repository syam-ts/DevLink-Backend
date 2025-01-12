 

export interface UserRepositary {
    allContracts(userId: string): Promise< any >
} 



export class AllContracts {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {  
        console.log('The usecase USER ID : ', userId)

           const response = await this.userRepositary.allContracts(userId); 
            
    

           return response;
    }
}