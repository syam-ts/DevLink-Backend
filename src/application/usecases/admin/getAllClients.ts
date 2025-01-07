import { Client } from '../../../domain/entities/Client';

export interface AdminRepositary {
    findAllClients(): Promise< any >;
}


export class GetAllClients {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute () {
        const clients = await this.adminRepositary.findAllClients();
 
        return clients;
   }
}