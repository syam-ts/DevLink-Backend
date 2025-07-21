import { INotificationRepository } from "../../../domain/interfaces/INotificationRepository";
 
export class AllNotifications {
    constructor(private notificationRepository: INotificationRepository) { }

      execute(userId: string) { 
        return this.notificationRepository.getAllNotificationsUser(
            userId
        );

        
    }
}
