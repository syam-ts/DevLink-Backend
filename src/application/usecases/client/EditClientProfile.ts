

export interface ClientRepository {
    editClientProfile(clientId: string, editData: any): Promise <any>
};


export class EditClientProfile {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, editData: any) {
        const client = await this.clientRepository.editClientProfile(clientId, editData);

        console.log('The result from usecase', client)
    }
}