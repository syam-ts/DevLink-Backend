 

export interface ClientRepository {
    closeContract(contractId: string, progress: number): Promise <any>
    
};


export class CloseContract
{
    constructor( private clientRepository: ClientRepository) {};

    async execute(contractId: string, progress: number) { 
  
          const closedContract = await this.clientRepository.closeContract(contractId, progress);
    
          
          return closedContract;
    }
}