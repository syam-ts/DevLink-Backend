import { Client } from '../../../domain/entities/Client';

export interface AdminRepositary {
    getAllRequests(): Promise< any >;
}


export class GetAllRequests {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute () {
        const requests = await this.adminRepositary.getAllRequests(); 
        return requests
   }
}