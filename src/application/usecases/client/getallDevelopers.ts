


export interface ClientRepository {
    getallDevelopers(): Promise <any>
    
};


export class GetallDevelopers {
    constructor( private clientRepository: ClientRepository) {};

    async execute() { 
 

          const allDevelopers = await this.clientRepository.getallDevelopers();
        
          return allDevelopers;
    }
}