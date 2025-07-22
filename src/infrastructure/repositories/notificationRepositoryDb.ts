 
import { INotification } from "../../domain/entities/Notification";
import { INotificationRepository } from "../../domain/interfaces/INotificationRepository";
import { NotificationModel } from "../database/Schema/notificationSchema";

 

export class NotificationRepositoryDb implements INotificationRepository {

  public async getAllNotificationsClient(
    clientId: string
  ): Promise<INotification[]> {
    const notifications = await NotificationModel.aggregate([
      {
        $match: { reciever_id: clientId },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (!notifications) {
      throw new Error("No notification found");
    } else {
      return notifications;
    }
  }

  

  public async getAllINotificationsUser(
    userId: string
  ): Promise<INotification[]> {
    const notifications = await NotificationModel.find({
      reciever_id: userId,
    })
      .lean<INotification[]>()
      .sort({ createdAt: -1 })
      .exec();

    if (!notifications) {
      throw new Error("No notification found");
    } else {
      return notifications;
    }
  }
}
