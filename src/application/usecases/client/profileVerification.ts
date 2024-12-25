

export interface ClientRepository {
    profileVerification(clientId: string, editData: any): Promise <any>
};


export class ProfileVerification {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, editData: any) {
        console.log('The datas from usecatse', clientId,' the data ', editData)
        const client = await this.clientRepository.profileVerification(clientId, editData);

        console.log('The result from usecase', client)
    }
}