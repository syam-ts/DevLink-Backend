 

 
export interface UserRepositary {
    viewWallet(userId: string, currentPage: number | any): Promise< any >;
}

 
 
export class ViewWalletUser {
     constructor(private userRepositary: UserRepositary) {}
       
    async execute(userId: string, currentPage: number | any) {
        const result = await this.userRepositary.viewWallet(userId, currentPage);  

        return result;
     }
}





 
