import { Client } from '../../../domain/entities/Client';

export interface AdminRepositary {
    getAllClients(page: number): Promise< any >;
}


export class GetAllClients {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute (page: number) {
        const clients = await this.adminRepositary.getAllClients(page);
 
        return clients;
   }
}