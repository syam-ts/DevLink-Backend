

export interface ClientRepository {
    profileVerification(clientId: string, editData: any): Promise <any>
};


export class ProfileVerification {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, clientData: any) { 

        const { companyName, location, description, totalEmployees, domain, since } = clientData.editData
      
           if(!companyName || !location || !description || !totalEmployees || !domain || !since) {
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

       
        if(since < 1950 || since > 2024 ) {
            console.log("The date : ", since)
            throw new Error("Date need to be valid", )
        } 

        const verify = await this.clientRepository.profileVerification(clientId, clientData);
        
        return verify;
    }

}