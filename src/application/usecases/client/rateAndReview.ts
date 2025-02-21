type Id = string;

export interface ClientRepository {
    rateAndReviewUser(userId: Id, clientId: Id,notificationId: Id, rating: number, review: string): Promise<any>
};


export class RateAndReview {
    constructor(private clientRepository: ClientRepository) {}; 
    async execute(userId: Id, clientId: Id, notificationId: Id, rating: number, review: string) { 
 
        const response = await this.clientRepository.rateAndReviewUser(userId, clientId, notificationId, rating, review);
        return response;
    }
}