import { User } from '../../../domain/entities/User';

export interface AdminRepositary {
    getAllUsers(page: number, sortType: string): Promise< any >;
}


export class GetAllUsers {

    constructor(private adminRepositary: AdminRepositary) {}

   async execute (page: number, sortType: string) {
        const users = await this.adminRepositary.getAllUsers(page, sortType); 
        
        return users
   }
}