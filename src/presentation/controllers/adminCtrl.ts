import { allAdminUseCases } from "../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../helper/constants/enums";
import { StatusMessage } from "../../helper/constants/stausMessages";
import generateTokens from "../../utils/generateTokens";
import { Request, Response } from "express";
import logger from "../../logger/logger";

export class AdminController {
  // async signUpAdmin(req: Request, res: Response): Promise<void>  {
  //     try{
  //         const adminId: string = '676bfa326c2e4c9fc3afba8e'

  //         const users = await allAdminUseCases.create.execute(adminId);

  //         res.json({message: "Successfully fetched all the users", data: users, success: true});

  //     }catch(err) {
  //         res.json({message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR] , success: false});
  //     }
  // },

  async loginAdmin(req: Request, res: Response): Promise<void> {
    try {
      const admin = await allAdminUseCases.loginAdminUseCase.execute(req.body);
      if (!admin) throw new Error("admin not exists");

      admin.role = "admin";

      const { accessToken, refreshToken } = generateTokens(admin);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        admin,
        accessToken,
        refreshToken,
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

  async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const clientMetrics =
        await allAdminUseCases.clientMetricsUseCase.execute();
      const userMetrics = await allAdminUseCases.userMetricsUseCase.execute();

      const { range } = req.params;
      const getRevenue = await allAdminUseCases.getRevenueUseCase.execute(
        range
      );

      const response = {
        clientMetrics: clientMetrics,
        userMetrics: userMetrics,
        getRevenue: getRevenue,
      };
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
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

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page);
      const sortType = String(req.query.sortType || "asc");

      const users = await allAdminUseCases.getAllUsersUseCase.execute(
        page,
        sortType
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: users,
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

  async getAllClients(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page);
      const sortType = String(req.query.sortType);
      const clients = await allAdminUseCases.getAllClientsUseCase.execute(
        page,
        sortType
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: clients,
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

  async blockUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await allAdminUseCases.blockUserUseCase.execute(userId);
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

  async unBlockUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await allAdminUseCases.unBlockUserUseCase.execute(userId);
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

  async blockClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      const client = await allAdminUseCases.blockClientUseCase.execute(
        clientId
      );
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

  async unBlockClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      const client = await allAdminUseCases.unBlockClientUseCase.execute(
        clientId
      );

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

  async viewWallet(req: Request, res: Response): Promise<void> {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
      const wallet = await allAdminUseCases.viewWalletAdminUseCase.execute(
        currentPage
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        wallet,
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

  async logoutAdmin(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      });

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

  async verifyAccept(req: Request, res: Response): Promise<void> {
    try {
      const response = await allAdminUseCases.verifyAcceptUseCase.execute(
        req.body
      );

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

  async getRequests(req: Request, res: Response): Promise<void> {
    try {
      const response = await allAdminUseCases.getAllRequestsUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
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

  async getRequestedClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      const response = await allAdminUseCases.getRequestedClientUseCase.execute(
        clientId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
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

  async viewRoleInfo(req: Request, res: Response): Promise<void> {
    try {
      const { roleId, roleInfo } = req.params;
      const response = await allAdminUseCases.viewRoleInfoUseCase.execute(
        roleId,
        roleInfo
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
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

  async getWallet(req: Request, res: Response): Promise<void> {
    try {
      const response = await allAdminUseCases.getWalletUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
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

  async sortUser(req: Request, res: Response): Promise<void> {
    try {
      const sortingType = String(req.query.sortType);
      const response = await allAdminUseCases.sortUserUseCase.execute(
        sortingType
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
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

  async sortClient(req: Request, res: Response): Promise<void> {
    try {
      const sortingType = String(req.query.sortingType);
      const response = await allAdminUseCases.sortClientUseCase.execute(
        sortingType
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
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

  async getAllContracts(req: Request, res: Response): Promise<void> {
    try {
      const currentPage = Number(req.query.currentPage);
      const contracts =
        await allAdminUseCases.viewContractsAdminUseCase.execute(currentPage);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contracts,
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

  async viewSingleContract(req: Request, res: Response): Promise<void> {
    try {
      const contractId = String(req.params.contractId);

      const contract =
        await allAdminUseCases.viewSingleContractAdminUseCase.execute(
          contractId
        );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contract,
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

  async successMoneyTransfer(req: Request, res: Response): Promise<void> {
    try {
      const {
        roleType,
        userId,
        paymentScreenshot,
        amount,
        upiId,
        requestId,
        requestedAmount,
      }: {
        roleType: string;
        userId: string;
        paymentScreenshot: string;
        amount: number;
        upiId: number;
        requestId: string;
        requestedAmount: number;
      } = req.body.body;

      const response =
        await allAdminUseCases.successMoneyTransferUseCase.execute(
          roleType,
          userId,
          paymentScreenshot,
          amount,
          upiId,
          requestId
        );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
    }
  }

  async getWithdrawRequests(req: Request, res: Response): Promise<void> {
    try {
      const requests =
        await allAdminUseCases.getWithdrawRequestsUseCase.execute();
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        requests,
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

  async viewContracts(req: Request, res: Response): Promise<void> {
    try {
      const currentPage = Number(req.query.currentPage);
      const response = await allAdminUseCases.viewContractsAdminUseCase.execute(
        currentPage
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
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
