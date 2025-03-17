import { Client } from "../../../domain/entities/Client";

export interface AdminRepositary {
    sortClients(sortingType: string): Client;
}

export class SortClient {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(sortingType: string) {
        const foundClient = await this.adminRepositary.sortClients(sortingType);
        return foundClient;
    }
}
