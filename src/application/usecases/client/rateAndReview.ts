import { Notification } from "../../../domain/entities/Notification";
import { User } from "../../../domain/entities/User";

type Id = string;

export interface ClientRepository {
    rateAndReviewUser(
        userId: Id,
        clientId: Id,
        notificationId: Id,
        rating: number,
        review: string
    ): Promise<{updateUser: User, removeExtra: Notification}>;
}

export class RateAndReview {
    constructor(private clientRepository: ClientRepository) { }
    async execute(
        userId: Id,
        clientId: Id,
        notificationId: Id,
        rating: number,
        review: string
    ) {
        const response = await this.clientRepository.rateAndReviewUser(
            userId,
            clientId,
            notificationId,
            rating,
            review
        );
        return response;
    }
}
