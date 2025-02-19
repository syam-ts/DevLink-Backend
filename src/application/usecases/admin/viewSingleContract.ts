
export interface AdminRepositary {
    viewSingleContract(contractId: string): Promise< null >;
}

export class ViewSingleContract {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(contractId: string) {     
         
        const result = await this.adminRepositary.viewSingleContract(contractId);

        return result; 
    }
}