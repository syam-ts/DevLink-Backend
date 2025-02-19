

 

export interface UserRepositary {
    viewSingleContract(contractId: string): Promise< any >
} 



export class ViewSingleContractUser {
    constructor(private userRepositary: UserRepositary) {}

    async execute( contractId: string ) {   

           const response = await this.userRepositary.viewSingleContract(contractId); 
             

           return response;
    }
}