 

export interface AdminRepositary {
    findClient(adminId: string): Promise< any >;
}

export class GetRequestedClient {
    constructor(private adminRepositary: AdminRepositary) {}

    async execute(clientId: string) {    
         
        const foundClient = await this.adminRepositary.findClient(clientId);
  
         
        return { foundClient}; 
        
    }
}