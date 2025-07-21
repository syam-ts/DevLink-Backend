import { Request, Response } from "express";
import { allClientUseCases } from "../../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from "../../../utils/generateTokens";
import { GetSingleJobPost } from "../../../application/usecases/user/getSingleJobPost";
import logger from '../../../logger/logger';

type Id = string;

interface RequestRole {
  user: { id: Id; role: string };
  role: string;
  body: {
    contractId: Id;
    notificationId: Id;
    wishlistId: Id;
    inviteId: Id;
  };
}

export const clientController = {
  signupClient: async (req: Request, res: Response): Promise<void> => {
    try { 
      const otp = await allClientUseCases.signupClientUseCase.execute(req.body);
     
      if (otp) {
        res.status(HttpStatusCode.CREATED).json({
          message: StatusMessage[HttpStatusCode.CREATED],
          data: req.body,
          otp,
          success: true,
        });
      }
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

  verifyOtp: async (req: Request, res: Response): Promise<void> => {
    try {
      const client = await allClientUseCases.verifyClientUseCase.execute(
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

  //From here fix status

  resendOtp: async (req: Request, res: Response): Promise<void> => {
    try {
      const client = await allClientUseCases.signupClientUseCase.execute(
        req.body
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        newOtp: client,
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

  verifyEmail: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await allClientUseCases.verifyEmailClientUseCase.execute(
        req.body.email
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

  resetPassword: async (req: Request, res: Response): Promise<void> => {
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

  loginClient: async (req: Request, res: Response) => {
    try {
      const client = await allClientUseCases.loginClientUseCase.execute(
        req.body
      );
      if (!client) {
        res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
        return;
      }

      client.role = "client"; 
      const { accessToken, refreshToken } = generateTokens(client);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      if (!client) {
        res.status(HttpStatusCode.NOT_FOUND).json({
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

  googleLogin: async (req: Request, res: Response): Promise<void> => {
    try {
      const client = await allClientUseCases.GoogleLoginClientUseCase.execute(
        req.body
      );

      if (!client) {
        res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
        return;
      }

      client.role = "client";
      const { accessToken, refreshToken } = generateTokens(client);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res
        .status(HttpStatusCode.OK)

        .json({
          message: StatusMessage[HttpStatusCode.OK],
          client,
          accessToken,
          refreshToken, success: true
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

  getHomeClient: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await allClientUseCases.getHomeClientUseCase.execute();

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

  trendingJobs: async (req: Request, res: Response): Promise<void> => {
    try {
      const jobs = await allClientUseCases.trendingJobsUseCase.execute();

       res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: jobs,
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

  getSelectedJobs: async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobsType } = req.params;
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const currentPage: number = Number(req.query.currentPage) || 1;

      const response =
        await allClientUseCases.getSelectedJobsClientUseCase.execute(
          clientId,
          jobsType,
          currentPage
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

  getProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
          res.status(401).json({ message: "Unauthorized", success: false });
      }
       const clientId = String(req.user?.id);
      const client = await allClientUseCases.getClientProfileUseCase.execute(
        clientId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: client,
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

  profileVerification: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;

      const response =
        await allClientUseCases.profileVerificationUseCase.execute(
          clientId,
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

  editProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);; 
      const response = await allClientUseCases.editClientProfileUseCase.execute(
        clientId,
        req.body
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
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

  logoutClient: async (req: Request, res: Response): Promise<void> => {
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

  
  makePayment: async (req: Request, res: Response): Promise<void> => {
    try {
      //  if (!req.user || !req.user.id) {
      //   return res.status(401).json({ message: "Unauthorized", success: false });
      // }
      // const clientId = String(req.user?.id);;
      const clientId = '67e268a4a9ff4accb5a24d34'
      const response = await allClientUseCases.makePaymentUseCase.execute(
        clientId,
        req.body
      );

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

  createJobPost: async (req: Request, res: Response): Promise<void> => {
    try { 
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const { data } = req.body;

      const jobPost = await allClientUseCases.createJobPostUseCase.execute(
        clientId,
        data
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
        data: jobPost,
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

  getUserProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const response = await allClientUseCases.getUserProfileUseCase.execute(
        userId
      );

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

  getProposals: async (req: Request, res: Response): Promise<void> => {
    try {
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const response = await allClientUseCases.getProposalsUseCase.execute(
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

  createContract: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, clientId, jobPostId, bidAmount, bidDeadline } = req.body;

      if (!userId && !clientId && !jobPostId) {
         res
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

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
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

  rejectProposal: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, jobPostId }: { userId: string; jobPostId: string } =
        req.body;
        if (!req.user || !req.user.id) {
           res.status(401).json({ message: "Unauthorized", success: false });
        }
        const clientId = String(req.user?.id);;

      if (!userId && !clientId && !jobPostId) {
         res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Missing informations ", success: false });
      }

      const response = await allClientUseCases.rejectProposalUseCase.execute(
        clientId,
        userId,
        jobPostId
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
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

  viewContracts: async (req: Request, res: Response): Promise<void> => {
    try {
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const { contractViewType } = req.params;
      const currentPage: number = Number(req.query.currentPage) || 1;
      const contracts =
        await allClientUseCases.viewContractsClientUseCase.execute(
          clientId,
          contractViewType,
          currentPage
        );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: contracts,
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

  viewSubmissions: async (req: Request, res: Response): Promise<void> => {
    try {
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const response = await allClientUseCases.viewSubmissionsUseCase.execute(
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

  closeContract: async (req: Request, res: Response): Promise<void> => {
    try { 
      const { contractId, progress } = req.body;
      const response = await allClientUseCases.closeContractUseCase.execute(
        contractId,
        progress
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

  rateAndReview: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized", success: false });
     }
     const clientId = String(req.user?.id);
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

  sendMessage: async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await allClientUseCases.sendMessageUseCase.execute(
        req.body
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
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

  getAllChats: async (req: Request, res: Response): Promise<void> => {
    try { 
      const { roleId } = req.params;
      const response = await allClientUseCases.getAllChatsUseCase.execute(
        roleId
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

  viewChat: async (req: Request, res: Response): Promise<void> => {
    try {  
      const { roleType, roleId, targetId, roleName } = req.params;

      const response = await allClientUseCases.viewChatUseCase.execute(
        roleType,
        roleId,
        targetId,
        roleName
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        messages: response,
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

  viewWallet: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);
      const currentPage = Number(req.query.currentPage)
      const response = await allClientUseCases.viewWalletUseCase.execute(
        clientId,
        currentPage
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        wallet: response,
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

  getallDevelopers: async (req: Request, res: Response): Promise<void> => {
    try {
      const response =
        await allClientUseCases.getallDevelopersUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        developers: response,
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

  rejectContract: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized", success: false });
      }
      const { contractId }: {contractId: string} = req.body;
     const clientId = String(req.user?.id);
      const response = await allClientUseCases.rejectContractUseCase.execute(
        contractId,
        clientId
      );

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

  listAllJobs: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const response = await allClientUseCases.listAllJobsClientUseCase.execute(
        clientId
      );

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

  inviteJobsList: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const response = await allClientUseCases.inviteJobsListUseCase.execute(
        clientId
      );

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

  inviteUser: async (req: Request, res: Response): Promise<void> => {
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
      const clientId = String(req.user?.id);;

      const response = await allClientUseCases.inviteUserUseCase.execute(
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
     const err = error as {message: string};
      logger.error(err.message);
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        }); 
      return;
    }
  },

  viewInvite: async (req: Request, res: Response): Promise<void> => {
    try {  
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);;
      const {inviteType}= req.params;

      const invites = await allClientUseCases.viewInviteUseCase.execute(clientId, inviteType);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        invites,
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

  getSingleJobPost: async (req: Request, res: Response): Promise<void> => {
    try {

      const { jobPostId } = req.params;
      const jobPost = await allClientUseCases.getSingleJobPostClientUseCase.execute(
        jobPostId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        jobPost,
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

  searchDevlopers: async(req: Request, res: Response): Promise<void> => {
    try {

    const {input}: {input: string} = req.body;
    const developers = await allClientUseCases.searchDeveloperUseCase.execute(input);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        developers,
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
  withdrawMoneyByClient: async (req: Request, res: Response): Promise<void> => {
    try {
      const { amount, accountNumber, balance, type } = req.body;
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const clientId = String(req.user?.id);

      const response = await allClientUseCases.withdrawMoneyByClientUseCase.execute(
        clientId,
        amount,
        accountNumber
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
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
};
