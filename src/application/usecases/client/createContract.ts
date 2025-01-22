


export interface ClientRepository {
    createContract(clientId: string,userId: string, jobPostId: string, bidAmount: number, bidDeadline: string): Promise <any>
    
};


export class CreateContract
{
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, userId: string , jobPostId: string, bidAmount: number, bidDeadline: string) { 
 

          const createdContract = await this.clientRepository.createContract(clientId, userId, jobPostId, bidAmount, bidDeadline);
          if(!createdContract) {
            throw new Error('Something went wrong')
          }

          
          return createdContract;
    }
}