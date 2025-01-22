 

export interface ClientRepository {
    closeContract(contractId: string, description: string, progress: number): Promise <any>
    
};


export class CloseContract
{
    constructor( private clientRepository: ClientRepository) {};

    async execute(contractId: string, description: string, progress: number) { 
 

          const closedContract = await this.clientRepository.closeContract(contractId, description, progress);
    
          
          return closedContract;
    }
}