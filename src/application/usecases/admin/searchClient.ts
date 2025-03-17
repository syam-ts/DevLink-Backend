import { Client } from "../../../domain/entities/Client";

export interface AdminRepositary {
    searchClients(inputData: string): Client;
}

export class SearchClient {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(inputData: string) {     
         
        const foundClient = await this.adminRepositary.searchClients(inputData);
        return foundClient; 
    }
}