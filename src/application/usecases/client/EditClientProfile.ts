

export interface ClientRepository {
    editClientProfile(clientId: string, clientData: any): Promise <any>
};


export class EditClientProfile {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, clientData: any) {
        
        const { companyName, location, description, totalEmployees, since } = clientData;
        
        if(companyName) {
            
           if(companyName.length > 20 || companyName.length < 4 ) {
            throw new Error("Company name Should be between atleast 4 to 20 characters", )
        }
        }

       
       if(location) {
        if(location.length < 4 ) {
            throw new Error("Location name should be atleast 4 letters", )
        }
       }

       if(description) {
        
        if(description.length < 20 ) {
            throw new Error("Description should have alteast 20 words", )
        }
       }

       
      if(since) {
        if(since < 1950 || since > 2024 ) {
            console.log("The date : ", since)
            throw new Error("Date need to be valid", )
        } 
      }
        
        const client = await this.clientRepository.editClientProfile(clientId, clientData);

        console.log('The result from usecase', client)
    }
}