 

export interface AdminRepositary {
    sortClients(sortingType: string): Promise< any >;
}

export class SortClient {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(sortingType: string) {    
         
        const foundClient = await this.adminRepositary.sortClients(sortingType);
        return foundClient; 
    }
}