 
import { Notification, NotificationModel } from "../../domain/entities/Notification";
import { INotificationRepository } from "../../domain/interfaces/INotificationRepository";

 

export class NotificationRepositoryDb implements INotificationRepository {

  public async getAllNotificationsClient(
    clientId: string
  ): Promise<Notification[]> {
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

  public async getAllNotificationsUser(
    userId: string
  ): Promise<Notification[]> {
    const notifications = await NotificationModel.find({
      reciever_id: userId,
    })
      .lean<Notification[]>()
      .sort({ createdAt: -1 })
      .exec();

    if (!notifications) {
      throw new Error("No notification found");
    } else {
      return notifications;
    }
  }
}
