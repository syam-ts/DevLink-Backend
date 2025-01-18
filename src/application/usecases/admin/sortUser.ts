 

export interface AdminRepositary {
    sortUser(sortingType: string): Promise< any >;
}

export class SortUser {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(sortingType: string) {    
         
        const foundUser = await this.adminRepositary.sortUser(sortingType);
        return foundUser; 
    }
}