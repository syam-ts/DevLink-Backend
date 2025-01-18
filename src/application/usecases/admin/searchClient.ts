
export interface AdminRepositary {
    searchClients(inputData: string): Promise< any >;
}

export class SearchClient {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(inputData: string) {     
         
        const foundClient = await this.adminRepositary.searchClients(inputData);
        return foundClient; 
    }
}