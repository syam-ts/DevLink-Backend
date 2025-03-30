import { User } from "../../../domain/entities/User";

export interface AdminRepositary {
    sortUser(sortingType: string): Promise<{users: User[], totalPages: number}>;
}

export class SortUser {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(sortingType: string) {
        const foundUser = await this.adminRepositary.sortUser(sortingType);
        return foundUser;
    }
}
