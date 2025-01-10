
export interface userRepository{
    closeContract(contractId: string, description: string, progress: any): Promise<any>
}

export class CloseContract {
    constructor(private userepository: userRepository) {} 

    async execute(contractId: string, description: string, progress: any) {
        const contract = await this.userepository.closeContract(contractId, description, progress);

        return contract;
    }
}