 

 
export interface ClientRepositary {
    viewWallet(clientId: string): Promise< any >;
}

 
 
export class ViewWallet {
     constructor(private clientRepositary: ClientRepositary) {}
       
    async execute(clientId: string) {
        const result = await this.clientRepositary.viewWallet(clientId);  

        return result;
     }
}





 
