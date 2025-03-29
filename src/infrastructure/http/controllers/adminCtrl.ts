import { allAdminUseCases } from "../../../helper/controllerHelper/allCtrlConnection";

import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from "../../../utils/generateTokens";
import { ErrorRequestHandler, Request, Response } from "express";

export const adminController = {
  // signUpAdmin: async(req: Request, res: Response) => {
  //     try{
  //         const adminId: string = '676bfa326c2e4c9fc3afba8e'

  //         const users = await allAdminUseCases.create.execute(adminId);

  //         res.json({message: "Successfully fetched all the users", data: users, success: true});

  //     }catch(err) {
  //         res.json({message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR] , success: false});
  //     }
  // },

  loginAdmin: async (req: Request, res: Response) => {
    try {
      const admin = await allAdminUseCases.loginAdminUseCase.execute(req.body);
      if(!admin) throw new Error('admin not exists');

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
    } catch (err) {
      if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getDashboard: async (req: Request, res: Response) => {
    try { 
      const clientMetrics = await allAdminUseCases.clientMetricsUseCase.execute();
      const userMetrics = await allAdminUseCases.userMetricsUseCase.execute();

      const { range } = req.params; 
      const getRevenue = await allAdminUseCases.getRevenueUseCase.execute(range);
   
      const response = {
        clientMetrics: clientMetrics,
        userMetrics: userMetrics ,
        getRevenue: getRevenue
      }
      return res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;  
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
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getAllClients: async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page) || 1;  
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
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  blockUser: async (req: Request, res: Response) => {
    try {
      const {userId } = req.params;
      const user = await allAdminUseCases.blockUserUseCase.execute(userId); 
    console.log('user: ', user);
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
   
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  unBlockUser: async (req: Request, res: Response) => {
    try {
      const {userId } = req.params;
      const user = await allAdminUseCases.unBlockUserUseCase.execute(
        userId
      );
      console.log('user: ', user); 

        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
       
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  blockClient: async (req: Request, res: Response) => {
    try {
      const {clientId } = req.params;
      const client = await allAdminUseCases.blockClientUseCase.execute(
        clientId
      ); 
      console.log('client: ',client);
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  unBlockClient: async (req: Request, res: Response) => {
    try {
      const {clientId} = req.params;
      const client = await allAdminUseCases.unBlockClientUseCase.execute(
        clientId
      );
      console.log('client: ',client); 
      
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  viewWallet: async (req: Request, res: Response) => {
    try {
      const currentPage = Number(req.query.page) || 1;  
      const wallet = await allAdminUseCases.viewWalletAdminUseCase.execute(
        currentPage
      ); 
        res
          .status(HttpStatusCode.OK)
          .json({
            message: StatusMessage[HttpStatusCode.OK],
            wallet,
            success: true,
          });
   
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  logoutAdmin: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  verifyAccept: async (req: Request, res: Response) => {
    try {
      const response = await allAdminUseCases.verifyAcceptUseCase.execute(
        req.body
      );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getRequests: async (req: Request, res: Response) => {
    try {
      const response = await allAdminUseCases.getAllRequestsUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getRequestedClient: async (req: Request, res: Response) => {
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
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  viewRoleInfo: async (req: Request, res: Response) => {
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
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getWallet: async (req: Request, res: Response) => {
    try {
      const response = await allAdminUseCases.getWalletUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

   

  sortUser: async (req: Request, res: Response) => {
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
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },
 

  sortClient: async (req: Request, res: Response) => {
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
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  getAllContracts: async (req: Request, res: Response) => {
    try {
      const currentPage = Number(req.query.currentPage)
      const contracts = await allAdminUseCases.viewContractsAdminUseCase.execute(currentPage);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contracts,
        success: true,
      });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  viewSingleContract: async (req: Request, res: Response) => {
    try {
      const contractId = String(req.params.contractId);

      const contract = await allAdminUseCases.viewSingleContractAdminUseCase.execute(
        contractId
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contract,
        success: true,
      });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  successMoneyTransfer: async (req: Request, res: Response) => {
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
      const err = error as { message: string };
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
    }
  },

  getWithdrawRequests: async (req: Request, res: Response) => {
    try {
      const requests = await allAdminUseCases.getWithdrawRequestsUseCase.execute();
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        requests,
        success: true,
      });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  },

  viewContracts: async (req: Request, res: Response) => {
    try {
      const currentPage = Number(req.query.currentPage);
      const response = await allAdminUseCases.viewContractsAdminUseCase.execute(currentPage);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
        success: true,
      });
    } catch (err) {
         if (err instanceof Error) { 
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
    }
  }
};
