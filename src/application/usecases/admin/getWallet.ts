 

export interface AdminRepositary {
    getWallet(adminId: any): Promise< any >;
}

export class GetWallet {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute() {    
         
        const adminId = process.env.ADMIN_OBJECT_ID;
        const wallet = await this.adminRepositary.getWallet(adminId);
  
         
        return { wallet}; 
        
    }
}