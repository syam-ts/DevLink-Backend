import { User } from '../../../domain/entities/User';

export interface AdminRepositary {
    findAllUsers(): Promise< any >;
}


export class GetAllUsers {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute () {
        const users = await this.adminRepositary.findAllUsers(); 
        
        return users
   }
}