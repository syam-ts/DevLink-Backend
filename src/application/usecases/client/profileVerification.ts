

export interface ClientRepository {
    profileVerification(clientId: string, editData: any): Promise <any>
};


export class ProfileVerification {
    constructor( private clientRepository: ClientRepository) {};

    async execute(clientId: string, editData: any) {
        const client = await this.clientRepository.profileVerification(clientId, editData);

    }
}