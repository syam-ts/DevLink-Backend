import { User } from "../../../domain/entities/User";

export interface AdminRepositary {
    searchUser(inputData: string): User;
}

export class SearchUser {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(inputData: string) {
        const foundUser = await this.adminRepositary.searchUser(inputData);
        return foundUser;
    }
}
