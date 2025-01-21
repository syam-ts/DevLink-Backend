 

export interface ClientRepository {
    closeContract(contractId: string): Promise <any>
    
};


export class CloseContract
{
    constructor( private clientRepository: ClientRepository) {};

    async execute(contractId: string) { 
 

          const closedContract = await this.clientRepository.closeContract(contractId);
    
          
          return closedContract;
    }
}