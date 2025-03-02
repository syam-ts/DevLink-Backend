import { Request, Response } from "express";
import { allClientUseCases } from "../../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from "../../../utils/generateTokens";

type Id = string;

interface RequestRole {
  user: {id: Id, role: string},
  role: string 
  body: {
    contractId: Id,
    notificationId: Id, 
    wishlistId: Id, 
    inviteId: Id, 
  }
};

export const clientController = {
  signupClient: async (req: Request, res: Response) => {
    try {
      const otp = await allClientUseCases.signupClientUseCase.execute(req.body);
      if (otp) {
        res
          .status(HttpStatusCode.CREATED)
          .json({
            message: StatusMessage[HttpStatusCode.CREATED],
            data: req.body,
            otp,
            success: true,
          });
      }
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
    try {
      const client = await allClientUseCases.verifyClientUseCase.execute(
        req.body
      );
      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  //From here fix status

  resendOtp: async (req: Request, res: Response) => {
    try {
      const client = await allClientUseCases.signupClientUseCase.execute(
        req.body
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          newOtp: client,
          success: true,
        });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  verifyEmail: async (req: Request, res: Response) => {
    try {
      const response = await allClientUseCases.verifyEmailClientUseCase.execute(
        req.body.email
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const { password } = req.body;
      const response =
        await allClientUseCases.resetPasswordClientUseCase.execute(
          clientId,
          password
        );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  loginClient: async (req: Request, res: any) => {
    try {
      const client: any = await allClientUseCases.loginClientUseCase.execute(
        req.body
      );

      client.role = "client";
      const { accessToken, refreshToken } = generateTokens(client);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      
      if (!client) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({
            message: StatusMessage[HttpStatusCode.NOT_FOUND],
            sucess: false,
          });
        } else {
        res.status(HttpStatusCode.OK).json({
          message: StatusMessage[HttpStatusCode.OK],
          client,
          accessToken,
          refreshToken,
          success: true,
        });
      }
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },
  
  googleLogin: async (req: Request, res: Response) => {
    try {
      const client = await allClientUseCases.GoogleLoginClientUseCase.execute(
        req.body
      );
      res
      .status(HttpStatusCode.OK)
      .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err: any) {
      res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: err.message, sucess: false });
    }
  },
  
  getHomeClient: async (req: any, res: any) => {
    try {
      const users = await allClientUseCases.getHomeClientUseCase.execute();
      
      return res
      .status(HttpStatusCode.OK)
      .json({
        message: StatusMessage[HttpStatusCode.OK],
          data: users,
          success: true,
        });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
      }
  },

  trendingJobs: async (req: any, res: any) => {
    try {
      const jobs = await allClientUseCases.trendingJobsUseCase.execute(); 

      return res
      .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          data: jobs,
          success: true,
        });
    } catch (err: any) {
      res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: err.message, sucess: false });
    }
  },
  
  getSelectedJobs: async (req: Request, res: Response) => {
    try {
      const { jobsType } = req.params;
      const { id: clientId } = req.user;
      const currentPage : number = Number(req.query.currentPage) || 1; 
      
      const response = await allClientUseCases.getSelectedJobsClientUseCase.execute(
          clientId,
          jobsType,
          currentPage
        );
        res.status(HttpStatusCode.OK).json({
          message: StatusMessage[HttpStatusCode.OK],
          data: response,
          success: true,
        });
      } catch (err: any) {
        res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
      }
    },
    
  getProfile: async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const client = await allClientUseCases.getClientProfileUseCase.execute(
        clientId
      );

      res
      .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          data: client,
          success: true,
        });
      } catch (err: any) {
      res.json({ message: err.messge, sucess: false });
    }
  },

  profileVerification: async (req: any, res: Response) => {
    try {
      const clientId = req.user.id;
      
      const response =
      await allClientUseCases.profileVerificationUseCase.execute(
          clientId,
          req.body
        );

        res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
      } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  editProfile: async (req: any, res: Response) => {
    try {
      const clientId = req.user.id;
      const response = await allClientUseCases.editClientProfileUseCase.execute(
        clientId,
        req.body
      );

      res
      .status(HttpStatusCode.CREATED)
        .json({
          message: StatusMessage[HttpStatusCode.CREATED],
          success: true,
        });
      } catch (err: any) {
        res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  logoutClient: async (req: Request, res: Response) => {
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  
  getAllNotifications: async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const response =
      await allClientUseCases.getAllNotificationsUseCase.execute(clientId);
      
      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          notifications: response,
          success: true,
        });
      } catch (err: any) {
        res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },
  
  
  
  makePayment: async (req: Request, res: Response) => {
    try {
      const { id: clientId } = req.user;
      const response = await allClientUseCases.makePaymentUseCase.execute(
        clientId,
        req.body
      );
      
      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
      }
    },
    
    createJobPost: async (req: Request, res: Response) => {
      try {
        const { id: clientId }: {id: string} = req.user; 
        const { data } = req.body;

        const jobPost = await allClientUseCases.createJobPostUseCase.execute(
          clientId,
          data
        );
  
        res
          .status(HttpStatusCode.CREATED)
          .json({
            message: StatusMessage[HttpStatusCode.CREATED],
            data: jobPost,
            success: true,
          });
      } catch (err: any) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: err.message, sucess: false });
      }
    },


    getUserProfile: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const response = await allClientUseCases.getUserProfileUseCase.execute(
        userId
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  getProposals: async (req: Request, res: Response) => {
    try {
      const { id: clientId } = req.user;
      const response = await allClientUseCases.getProposalsUseCase.execute(
        clientId
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },
  

  createContract: async (req: Request, res: any) => {
    try {
      const { userId, clientId, jobPostId, bidAmount, bidDeadline } = req.body;

      if (!userId && !clientId && !jobPostId) {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Missing informations ", success: false });
      }

      const response = await allClientUseCases.createContractUseCase.execute(
        clientId,
        userId,
        jobPostId,
        bidAmount,
        bidDeadline
      );

      res
        .status(HttpStatusCode.CREATED)
        .json({
          message: StatusMessage[HttpStatusCode.CREATED],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  rejectProposal: async (req: Request, res: any) => {
    try {
      const { userId, jobPostId }: {userId: string, jobPostId: string} = req.body;
      const {id: clientId}= req.user;

      if (!userId && !clientId && !jobPostId) {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Missing informations ", success: false });
      }

      const response = await allClientUseCases.rejectProposalUseCase.execute(
        clientId,
        userId,
        jobPostId
      );

      res
        .status(HttpStatusCode.CREATED)
        .json({
          message: StatusMessage[HttpStatusCode.CREATED],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },


  viewContracts: async (req: Request, res: Response) => {
    try{
 const { id: clientId } = req.user;
      const { contractViewType } = req.params;
      const currentPage : number = Number(req.query.currentPage) || 1; 
      const contracts = await allClientUseCases.viewContractsClientUseCase.execute(
        clientId,
        contractViewType,
        currentPage
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: contracts,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

 

  viewSubmissions: async (req: Request, res: Response) => {
    try {
      const { id: clientId } = req.user;
      const response = await allClientUseCases.viewSubmissionsUseCase.execute(
        clientId
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  closeContract: async (req: Request, res: Response) => {
    try {
      const { contractId, progress } = req.body;
      const response = await allClientUseCases.closeContractUseCase.execute(
        contractId,
        progress
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  rateAndReview: async (req: any, res: Response) => {

    try {
      const clientId: Id = req.user.id;
      const { notificationId } = req.params;
      const {
        userId,
        rating,
        review,
      }: { userId: Id; rating: number; review: string } = req.body;
      const response = await allClientUseCases.rateAndReviewUserUseCase.execute(
        userId,
        clientId,
        notificationId,
        rating,
        review
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  sendMessage: async (req: Request, res: Response) => {
    try {
      const response = await allClientUseCases.sendMessageUseCase.execute(
        req.body
      );

      res
        .status(HttpStatusCode.CREATED)
        .json({
          message: StatusMessage[HttpStatusCode.CREATED],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  getAllChats: async (req: Request, res: Response) => {
    try {
      const { roleId } = req.params;
      const response = await allClientUseCases.getAllChatsUseCase.execute(
        roleId
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          data: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  viewChat: async (req: Request, res: Response) => {
    try {
      const { roleType, roleId, targetId, roleName } = req.params;

      const response = await allClientUseCases.viewChatUseCase.execute(
        roleType,
        roleId,
        targetId,
        roleName
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          messages: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  viewWallet: async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
      const { currentPage } = req.query;
      const response = await allClientUseCases.viewWalletUseCase.execute(
        clientId,
        currentPage
      );

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          wallet: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  getallDevelopers: async (req: Request, res: Response) => {
    try {
      const response =
        await allClientUseCases.getallDevelopersUseCase.execute();

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          developers: response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  rejectContract: async (req: any, res: Response) => {
    try {
      const { contractId } = req.body;
      const clientId = req.user.id;
      const response =
        await allClientUseCases.rejectContractUseCase.execute(contractId, clientId);

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          response,
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  inviteUser: async (req: Request, res: Response) => {
    try {
      const {
        userId,
        clientId,
        jobPostId,
        description,
      }: {
        userId: string;
        clientId: string;
        jobPostId: string;
        description: string;
      } = req.body;
      const response = await allClientUseCases.inviteUserUseCase.execute(
        userId,
        clientId,
        jobPostId,
        description
      );

      res
        .status(HttpStatusCode.CREATED)
        .json({
          message: StatusMessage[HttpStatusCode.CREATED],
          success: true,
        });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },
};

//verify OTP sample json
// POST otp =  {
//     client: {
//       name: 'Syam',
//       password: 'syamWnanddhu3@gmail.com',
//       email: 'syamnanddhu3@gmail.com',
//       mobile: '8848700346'
//     },
//     mailOtp: 1111,
//     clientOtp: { otp: '1111' }
//   }
