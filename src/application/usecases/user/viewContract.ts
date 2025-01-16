 

export interface UserRepositary {
    viewContract(contractId: string): Promise<any>; 
}

export class ViewContract {
    constructor(private userRepositary: UserRepositary) { }

    async execute(contractId: string) {
        const contract = await this.userRepositary.viewContract(contractId);

        return contract
    }

    
}
