


export interface ClientRepository {
    createContract(clientId: string,userId: string, data: any): Promise <any>
    
};


export class CreateContract
{
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, userId: string , data: any) { 

      
 

         
          const contract = await this.clientRepository.createContract(clientId, userId, data);

          
          return contract;
    }
}