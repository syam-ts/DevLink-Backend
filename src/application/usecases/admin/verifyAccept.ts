 

export interface AdminRepositary {
    verifyAccept(data: any): Promise< any >;
}

export class VerifyAccept {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(data: any) {    
  
        const foundAdmin = await this.adminRepositary.verifyAccept(data);
 
        console.log('The admin usecase : ', foundAdmin)

         
        return { foundAdmin}; 
        
    }
}