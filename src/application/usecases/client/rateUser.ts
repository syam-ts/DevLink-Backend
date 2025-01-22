 

export interface ClientRepository {
    rateUser( notificationId: string, userId: string, rating: number): Promise <any>
};


export class RateUser {
    constructor( private clientRepository: ClientRepository) {};

    async execute(userId: string, notificationId: string, rating: number) {
      

        const response = await this.clientRepository.rateUser( notificationId, userId, rating ); 
        return response;
    }
}