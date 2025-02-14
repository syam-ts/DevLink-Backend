

export interface ClientRepository {
    inviteUser(userId: string, clientId: string, jobPostId: string): Promise <any>
};


export class InviteUser {
    constructor( private clientRepository: ClientRepository) {};

    async execute(userId: string, clientId: string, jobPostId: string) { 
      
        const result = await this.clientRepository.inviteUser(userId, clientId, jobPostId); 
        return result;
 
    }
}