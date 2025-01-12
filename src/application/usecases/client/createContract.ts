


export interface ClientRepository {
    createContract(clientId: string,userId: string, jobPostId: string): Promise <any>
    
};


export class CreateContract
{
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, userId: string , jobPostId: string) { 
 

          const createdContract = await this.clientRepository.createContract(clientId, userId, jobPostId);
          if(!createdContract) {
            throw new Error('Something went wrong')
          }

          
          return createdContract;
    }
}