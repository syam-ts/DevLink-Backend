

export interface ClientRepository {
    editClientProfile(clientId: string, clientData: any): Promise <any>
};


export class EditClientProfile {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, clientData: any) {

      
        
         
        if(clientData.editData.companyName) {
           if(clientData.editData.companyName.length > 20 || clientData.editData.companyName.length < 4 ) {
            throw new Error("Company name Should be between atleast 4 to 20 characters", )
        }
        }

       
       if(clientData.editData.location) {
        if(clientData.editData.location.length < 4 ) {
            throw new Error("Location name should be atleast 4 letters", )
        }
       }


       if(clientData.editData.description) {
        if(clientData.editData.description.length < 20 ) {
            throw new Error("Description should have alteast 20 words", )
        }
       }

       
      if(clientData.editData.since) {
        if(clientData.editData.since < 1950 || clientData.editData.since > 2024 ) { 
            throw new Error("Date need to be valid", )
        } 
      }
       
      for(let value in clientData.editData) {
          if(clientData.editData[value] == '') {
            clientData.editData[value] = clientData.unhangedData[value]
          }
      }

      console.log("The final clientData", clientData);
      
        const client = await this.clientRepository.editClientProfile(clientId, clientData.editData);
  
 
    }
}