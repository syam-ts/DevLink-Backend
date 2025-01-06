 

import jwt from 'jsonwebtoken';

export interface AdminRepositary {
    viewRoleInfo(roleId: string, roleInfo: string): Promise< any >;
}

export class ViewRoleInfo {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(roleId: string, roleInfo: string) {    
 
         
        const roleInformation= await this.adminRepositary.viewRoleInfo(roleId, roleInfo);
 
        console.log('The admin usecase : ',roleInformation)

         
        return {roleInformation}; 
        
    }
}