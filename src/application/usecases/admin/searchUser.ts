
export interface AdminRepositary {
    searchUser(inputData: string): Promise< any >;
}

export class SearchUser {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(inputData: string) {     
         
        const foundUser = await this.adminRepositary.searchUser(inputData);
        return foundUser; 
    }
}