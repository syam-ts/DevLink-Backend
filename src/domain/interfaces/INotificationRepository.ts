import { INotification } from "../entities/Notification";

 
export interface INotificationRepository {
    getAllNotificationsClient(clientId: string): Promise<INotification[]>;
    getAllINotificationsUser(userId: string): Promise<INotification[]>;
}
