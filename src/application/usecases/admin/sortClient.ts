import { Client } from "../../../domain/entities/Client";

export interface AdminRepositary {
    sortClients(sortingType: string): Promise<{clients: Client[], totalPages:number}>;
}

export class SortClient {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(sortingType: string) {
        const foundClient = await this.adminRepositary.sortClients(sortingType);
        return foundClient;
    }
}
