import { allAdminUseCases } from "../../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from "../../../utils/generateTokens";
import { ErrorRequestHandler, Request, Response } from "express";
import logger from '../../../logger/logger';

export const adminController = {
  // signUpAdmin: async(req: Request, res: Response): Promise<void> => {
  //     try{
  //         const adminId: string = '676bfa326c2e4c9fc3afba8e'

  //         const users = await allAdminUseCases.create.execute(adminId);

  //         res.json({message: "Successfully fetched all the users", data: users, success: true});

  //     }catch(err) {
  //         res.json({message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR] , success: false});
  //     }
  // },

  loginAdmin: async (req: Request, res: Response): Promise<void> => {
    try {
      const admin = await allAdminUseCases.loginAdminUseCase.execute(req.body);
      if(!admin) throw new Error('admin not exists');

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
         const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  getDashboard: async (req: Request, res: Response): Promise<void> => {
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
        res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
        success: true,
      });
    } catch (error: unknown) {
         const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('fom u', req.query)
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
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  getAllClients: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('from C: ',req.query)
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
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  blockUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const {userId } = req.params;
      const user = await allAdminUseCases.blockUserUseCase.execute(userId);  
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
   
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  unBlockUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const {userId } = req.params;
      const user = await allAdminUseCases.unBlockUserUseCase.execute(
        userId
      ); 
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
       
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  blockClient: async (req: Request, res: Response): Promise<void> => {
    try {
      const {clientId } = req.params;
      const client = await allAdminUseCases.blockClientUseCase.execute(
        clientId
      );  
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  unBlockClient: async (req: Request, res: Response): Promise<void> => {
    try {
      const {clientId} = req.params;
      const client = await allAdminUseCases.unBlockClientUseCase.execute(
        clientId
      );  
      
        res
          .status(HttpStatusCode.OK)
          .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  viewWallet: async (req: Request, res: Response): Promise<void> => {
    try {
      const currentPage = Number(req.query.currentPage) || 1;
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
   
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  logoutAdmin: async (req: Request, res: Response): Promise<void> => {
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
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  verifyAccept: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await allAdminUseCases.verifyAcceptUseCase.execute(
        req.body
      );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  getRequests: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await allAdminUseCases.getAllRequestsUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  getRequestedClient: async (req: Request, res: Response): Promise<void> => {
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
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  viewRoleInfo: async (req: Request, res: Response): Promise<void> => {
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
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  getWallet: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await allAdminUseCases.getWalletUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

   

  sortUser: async (req: Request, res: Response): Promise<void> => {
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
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },
 

  sortClient: async (req: Request, res: Response): Promise<void> => {
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
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  getAllContracts: async (req: Request, res: Response): Promise<void> => {
    try {
      const currentPage = Number(req.query.currentPage)
      const contracts = await allAdminUseCases.viewContractsAdminUseCase.execute(currentPage);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contracts,
        success: true,
      });
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  viewSingleContract: async (req: Request, res: Response): Promise<void> => {
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
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  successMoneyTransfer: async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        roleType,
        userId,
        paymentScreenshot,
        amount,
        upiId,
        requestId,
        requestedAmount
      }: {
        roleType: string;
        userId: string;
        paymentScreenshot: string;
        amount: number;
        upiId: number;
        requestId: string
        requestedAmount: number
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
  },

  getWithdrawRequests: async (req: Request, res: Response): Promise<void> => {
    try {
      const requests = await allAdminUseCases.getWithdrawRequestsUseCase.execute();
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        requests,
        success: true,
      });
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  viewContracts: async (req: Request, res: Response): Promise<void> => {
    try {
      const currentPage = Number(req.query.currentPage);
      const response = await allAdminUseCases.viewContractsAdminUseCase.execute(currentPage);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response,
        success: true,
      });
    } catch (error: unknown) {
            const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  }
};
