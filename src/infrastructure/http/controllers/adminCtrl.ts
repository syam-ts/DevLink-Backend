import { allAdminUseCases } from "../../../helper/controllerHelper/allCtrlConnection";

import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from "../../../utils/generateTokens";

export const adminController = {
  // signUpAdmin: async(req: any, res: any) => {
  //     try{
  //         const adminId: string = '676bfa326c2e4c9fc3afba8e'

  //         const users = await allAdminUseCases.create.execute(adminId);

  //         res.json({message: "Successfully fetched all the users", data: users, success: true});

  //     }catch(err: any) {
  //         res.json({message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR] , success: false});
  //     }
  // },

  loginAdmin: async (req: any, res: any) => {
    try {
      const admin = await allAdminUseCases.loginAdminUseCase.execute(req.body);

      admin.role = "admin";

      const { accessToken, refreshToken } = generateTokens(admin);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        admin,
        accessToken,
        refreshToken,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  getDashboard: async (req: any, res: any) => {
    try {
      const clientsAndUsers =
        await allAdminUseCases.getDashboardUseCase.execute();

      //    res.cookie("jwt", req.admin.accessToken, {
      //     httpOnly: true,
      //     sameSite: "None",
      //     secure: true,
      //     maxAge: 24 * 60 * 60 * 1000
      //   }
      // );
      return res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: clientsAndUsers,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  getAllUsers: async (req: any, res: any) => {
    try {
      const users = await allAdminUseCases.getAllUsersUseCase.execute(
        req.query.page,
        req.query.sortType
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: users,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  getAllClients: async (req: any, res: any) => {
    try {
      const clients = await allAdminUseCases.getAllClientsUseCase.execute(
        req.query.page,
        req.query.sortType
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: clients,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  blockUser: async (req: any, res: any) => {
    try {
      const user = await allAdminUseCases.blockUserUseCase.execute(req.params);

      if (user) {
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
      }
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  unBlockUser: async (req: any, res: any) => {
    try {
      const user = await allAdminUseCases.unBlockUserUseCase.execute(
        req.params
      );

      if (user) {
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
      }
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  blockClient: async (req: any, res: any) => {
    try {
      const client = await allAdminUseCases.blockClientUseCase.execute(
        req.params
      );

      if (client) {
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
      }
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  unBlockClient: async (req: any, res: any) => {
    try {
      const client = await allAdminUseCases.unBlockClientUseCase.execute(
        req.params
      );

      if (client) {
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
      }
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  viewWallet: async (req: any, res: any) => {
    try {
      const { currentPage } = req.query;
      const wallet = await allAdminUseCases.viewWalletAdminUseCase.execute(
        currentPage
      );

      if (wallet) {
        res
          .status(HttpStatusCode.OK)
          .json({
            message: StatusMessage[HttpStatusCode.OK],
            wallet,
            success: true,
          });
      }
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  logoutAdmin: async (req: any, res: any) => {
    try {
      res.clearCookie("jwtA", { path: "/" });

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  verifyAccept: async (req: any, res: any) => {
    try {
      const response = await allAdminUseCases.verifyAcceptUseCase.execute(
        req.body
      );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  getRequests: async (req: any, res: any) => {
    try {
      const response = await allAdminUseCases.getAllRequestsUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  getRequestedClient: async (req: any, res: any) => {
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
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  viewRoleInfo: async (req: any, res: any) => {
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
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  getWallet: async (req: any, res: any) => {
    try {
      const response = await allAdminUseCases.getWalletUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  searchUser: async (req: any, res: any) => {
    try {
      const { inputData } = req.query;
      const response = await allAdminUseCases.searchUserUseCase.execute(
        inputData
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  sortUser: async (req: any, res: any) => {
    try {
      const { sortingType } = req.query;
      const response = await allAdminUseCases.sortUserUseCase.execute(
        sortingType
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  searchClient: async (req: any, res: any) => {
    try {
      const { inputData } = req.query;
      const response = await allAdminUseCases.searchClientUseCase.execute(
        inputData
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  sortClient: async (req: any, res: any) => {
    try {
      const { sortingType } = req.query;
      const response = await allAdminUseCases.sortClientUseCase.execute(
        sortingType
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  getAllContracts: async (req: any, res: any) => {
    try {
      const contracts = await allAdminUseCases.getAllContractsUseCase.execute();
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contracts,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  viewSingleContract: async (req: any, res: any) => {
    try {
      const { contractId }: { contractId: string } = req.params;

      const contract = await allAdminUseCases.viewSingleContractUseCase.execute(
        contractId
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contract,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  successMoneyTransfer: async (req: any, res: any) => {
    try {
      const {
        userId,
        paymentScreenshot,
        amount,
        upiId,
        requestId,
        requestedAmount
      }: {
        userId: string;
        paymentScreenshot: string;
        amount: number;
        upiId: number;
        requestId: string
        requestedAmount: number
      } = req.body.body; 

      const response =
        await allAdminUseCases.successMoneyTransferUseCase.execute(
          userId,
          paymentScreenshot,
          amount,
          upiId,
          requestId,
          requestedAmount
        );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
        success: true,
      });
    } catch (error: unknown) {
      const err = error as {message: string};
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
    }
  },

  getWithdrawRequests: async (req: Request, res: any) => {
    try {
      const requests = await allAdminUseCases.getWithdrawRequestsUseCase.execute();
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        requests,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  },

  viewContracts: async (req: Request, res: any) => {
    try {
      const contracts = await allAdminUseCases.viewContractsAdminUseCase.execute();
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contracts,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR],
        success: false,
      });
    }
  }
};
