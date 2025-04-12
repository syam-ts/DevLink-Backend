import { Admin } from "../../../domain/entities/Admin";
import { Client } from "../../../domain/entities/Client";


interface ClientData {
    editData: Client
    unChangedData: Client
}

export interface ClientRepository {
    profileVerification(clientId: string, clientData: ClientData): Promise <Admin>
};


export class ProfileVerification {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, clientData: ClientData) {  
      
        const { companyName, location, description,domain,  numberOfEmployees, since } = clientData.editData;
      
           if(!companyName || !location || !description || !domain || ! numberOfEmployees || !since) {
                 throw new Error('All the fields need to be filled')
           }
     
           if(companyName.length > 20 || companyName.length < 4 ) {
            throw new Error("Company name Should be between atleast 4 to 20 characters", )
        }

       
        if(location.length < 4 ) {
            throw new Error("Location name should be atleast 4 letters", )
        }

       
        if(description.length < 20 ) {
            throw new Error("Description should have alteast 20 words", )
        }

       
        if(domain.length < 3 ) {
            throw new Error("Domain should have alteast 3 Characters", )
        }

       
        if(since < 1950 || since > 2024 ) { 
            throw new Error("Date need to be valid", )
        } 

        const verify = await this.clientRepository.profileVerification(clientId, clientData as ClientData);

        return verify;
    }

}