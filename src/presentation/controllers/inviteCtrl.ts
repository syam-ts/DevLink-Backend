import { Request, Response } from "express";
import { GetAllInvites } from "../../application/usecases/user/getAllInvites";
import { RejectInvite } from "../../application/usecases/user/rejectInvite"; 
import { HttpStatusCode } from "../../helper/constants/enums";
import logger from "../../logger/logger";
import { StatusMessage } from "../../helper/constants/stausMessages";
import { ViewInviteByClient } from "../../application/usecases/client/viewInvite";
import { InviteUser } from "../../application/usecases/client/inviteUser";
import { InviteRepositoryDb } from "../../infrastructure/repositories/InviteRepositoryDb";

const inviteRepo = new InviteRepositoryDb();
const getAllInvitesUserUseCase = new GetAllInvites(inviteRepo);
const rejectIviteUserUseCase = new RejectInvite(inviteRepo);
const inviteUserUseCase = new InviteUser(inviteRepo);
const viewInviteByClientUseCase = new ViewInviteByClient(inviteRepo);

export class InviteController {
  async getAllInvites(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const response = await getAllInvitesUserUseCase.execute(userId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        invites: response,
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

  async rejectInvite(req: Request, res: Response): Promise<void> {
    try {
      const { inviteId } = req.params;
      const response = await rejectIviteUserUseCase.execute(inviteId);

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
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

  async inviteUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        selectJobId,
        description,
      }: {
        userId: string;
        selectJobId: string;
        description: string;
      } = req.body;
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);

      const response = await inviteUserUseCase.execute(
        userId,
        clientId,
        selectJobId,
        description
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
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

  async viewInvite(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);
      const { inviteType } = req.params;

      const invites = await viewInviteByClientUseCase.execute(
        clientId,
        inviteType
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        invites,
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
