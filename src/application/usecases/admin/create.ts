import jwt from 'jsonwebtoken';

export interface AdminRepositary {
    create(adminId: string): Promise< any >;
}

export class Create {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(adminId: string) {    
 
         
        const foundAdmin = await this.adminRepositary.create(adminId);
 
        console.log('The admin usecase : ', foundAdmin)

         
        return { foundAdmin}; 
        
    }
}