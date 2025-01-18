import { User } from '../../../domain/entities/User';

export interface AdminRepositary {
    getAllUsers(page: number): Promise< any >;
}


export class GetAllUsers {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute (page: number) {
        const users = await this.adminRepositary.getAllUsers(page); 
        
        return users
   }
}