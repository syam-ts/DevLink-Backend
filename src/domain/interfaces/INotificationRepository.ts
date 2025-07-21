import { Notification } from "../entities/Notification";

export interface INotificationRepository {
    getAllNotificationsClient(clientId: string): Promise<Notification[]>;
    getAllNotificationsUser(userId: string): Promise<Notification[]>;
}
