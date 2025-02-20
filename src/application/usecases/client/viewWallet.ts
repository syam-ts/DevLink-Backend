 

 
export interface ClientRepositary {
    viewWallet(clientId: string , currentPage: number | any): Promise< any >;
}

 
 
export class ViewWallet {
     constructor(private clientRepositary: ClientRepositary) {}
       
    async execute(clientId: string , currentPage: number | any) {
        const result = await this.clientRepositary.viewWallet(clientId, currentPage);  

        return result;
     }
}





 
