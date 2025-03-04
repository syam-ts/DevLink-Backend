


export interface ClientRepository {
    getUserProfile(userId: string): Promise <any>
};


export class GetUserProfileClient {
    constructor( private clientRepository: ClientRepository) {};

    async execute(userId: string) {
        const user = await this.clientRepository.getUserProfile(userId);
 
        return user;
    }
}