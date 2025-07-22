import { GetAllNotifications } from "../../application/usecases/client/getAllNotifications"; 
import { HttpStatusCode } from "../../helper/constants/enums";
import { StatusMessage } from "../../helper/constants/stausMessages";
import { Response, Request } from "express";
import logger from "../../logger/logger";
import { AllNotifications } from "../../application/usecases/user/allNotifications";
import { NotificationRepositoryDb } from "../../infrastructure/repositories/notificationRepositoryDb";

const notificationRepo = new NotificationRepositoryDb();
const getAllNotificationsUserUseCase = new AllNotifications(notificationRepo);
const getAllNotificationsClientUseCase = new GetAllNotifications(
  notificationRepo
);

export class NotificationController {
  async allNotifications(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const allNotifications = await getAllNotificationsUserUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        notifications: allNotifications,
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      logger.error(err.message);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
      return;
    }
  }

  async getAllNotificationsClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      const response = await getAllNotificationsClientUseCase.execute(clientId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        notifications: response,
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      logger.error(err.message);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
      return;
    }
  }
}
