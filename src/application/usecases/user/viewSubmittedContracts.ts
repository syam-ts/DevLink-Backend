


 

export interface UserRepositary {
    viewSubmittedContracts(userId: string): Promise< any >
} 



export class ViewSubmittedContracts {
    constructor(private userRepositary: UserRepositary) {}

    async execute( userId: string ) {   

           const response = await this.userRepositary.viewSubmittedContracts(userId); 
             

           return response;
    }
}