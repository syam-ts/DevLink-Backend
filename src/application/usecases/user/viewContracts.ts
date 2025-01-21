

 

export interface UserRepositary {
    viewMyContracts(userId: string): Promise< any >
} 



export class ViewMyContracts {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {   

           const response = await this.userRepositary.viewMyContracts(userId); 
             

           return response;
    }
}