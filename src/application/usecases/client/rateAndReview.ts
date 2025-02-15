

export interface ClientRepository {
    rateAndReviewUser(notificationId: string, userId: string, rating: number, review: string): Promise<any>
};


export class RateAndReview {
    constructor(private clientRepository: ClientRepository) {}; 
    async execute(userId: string, notificationId: string, rating: number, review: string) { 

        const response = await this.clientRepository.rateAndReviewUser(notificationId, userId, rating, review);
        return response;
    }
}