import { INotificationRepository } from "../../../domain/interfaces/INotificationRepository";
 
export class GetAllNotifications {
    constructor(private notificationRepository: INotificationRepository) { }

    execute(clientId: string) {
        return this.notificationRepository.getAllNotificationsClient(clientId);
    }
}
