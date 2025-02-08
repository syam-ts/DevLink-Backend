 

 
export interface UserRepositary {
    viewWallet(userId: string): Promise< any >;
}

 
 
export class ViewWalletUser {
     constructor(private userRepositary: UserRepositary) {}
       
    async execute(userId: string) {
        const result = await this.userRepositary.viewWallet(userId);  

        return result;
     }
}





 
