import jwt from 'jsonwebtoken';

export interface AdminRepositary {
    findAdmin(name: string, password: string): Promise< any >;
}

export class LoginAdmin {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(admin: any) {    
 
 
        
        const foundAdmin = await this.adminRepositary.findAdmin(admin.name, admin.password);
      
        console.log('fn', foundAdmin)
 
        if (!foundAdmin) {
            throw new Error('Admin not Found');
        }  
 


        
        return foundAdmin; 
        
    }
}