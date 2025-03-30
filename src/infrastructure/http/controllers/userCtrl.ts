import { Request, Response } from "express";
import {
  allClientUseCases,
  allUserUseCases,
} from "../../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from "../../../utils/generateTokens";
import { Error } from "mongoose";

export const userController = {
  signupUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const otp = await allUserUseCases.signupUseCase.execute(req.body);

      if (otp) {
        res.status(HttpStatusCode.CREATED).json({
          message: StatusMessage[HttpStatusCode.CREATED],
          data: req.body,
          otp,
          success: true,
        });
      }
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  verifyOtp: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await allUserUseCases.verifyUserUseCase.execute(req.body);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  resendOtp: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await allUserUseCases.signupUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        newOtp: user,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  verifyEmail: async (req: Request, res: Response): Promise<void> => {
    try { 
      const response = await allUserUseCases.verifyEmailUseCase.execute(
        req.body.email
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  resetPassword: async (req: Request, res: Response): Promise<void> => {
    try { 
      let { userId } = req.params,
        { password } = req.body;
      const response = await allUserUseCases.resetPasswordUseCase.execute(
        userId,
        password
      );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err) {
      if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const user = await allUserUseCases.loginUseCase.execute(req.body);
      if (!user) {
        res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
        return;
      }
      if(!user.role) throw new Error('not eixist')
      user.role = "user";
      const { accessToken, refreshToken } = generateTokens(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        user,
        accessToken,
        refreshToken,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  googleLogin: async (req: Request, res: Response) => {
    try {
      const user = await allUserUseCases.GoogleLoginUserUseCase.execute(
        req.body
      );

      if (!user) {
        res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
        return;
      }

      user.role = "user";
      const { accessToken, refreshToken } = generateTokens(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        user,
        accessToken,
        refreshToken,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  getHomeUser: async (req: Request, res: Response) => {
    try {
      const clients = await allUserUseCases.getHomeUseCase.execute();

      return res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: clients,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  getProfile: async (req: Request, res: Response): Promise<void> => {
    try {
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const user = await allUserUseCases.getProfileUseCase.execute(userId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: user,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  alterProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.params;
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const profileData = req.body;

      const response = await allUserUseCases.alterProfileUseCase.execute(
        userId,
        profileData,
        type
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  logoutUser: async (req: Request, res: Response): Promise<void> => {
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
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  listHomeJobs: async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.params;
      const response = await allUserUseCases.listHomeJobsUseCase.execute(type);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  getSelectedJobs: async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobsType } = req.params; 
     if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const currentPage: number = Number(req.query.currentPage) || 1;
      const query = {
        amount: Number(req.query.amount) || 0,
        paymentType: req.query.paymentType as "hourly" | "fixed",
        expertLevel: req.query.expertLevel as "beginner" | "intermediate" | "advanced",
      };

      const response = await allUserUseCases.getSelectedJobsUseCase.execute(
        userId,
        jobsType,
        query,
        currentPage
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  createProposal: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, jobPostId, description, bidAmount, bidDeadline } =
        req.body.body;
      const response = await allUserUseCases.createProposalUseCase.execute(
        userId,
        jobPostId,
        description,
        bidAmount,
        bidDeadline
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
        data: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  viewProposals: async (req: Request, res: Response): Promise<void> => {
    try {
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const response = await allUserUseCases.viewProposalsUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        proposals: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  allNotifications: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const allNotifications =
        await allUserUseCases.allNotificationsUseCase.execute(userId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        notifications: allNotifications,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  // closingContract: async (req: Request, res: Response): Promise<void> => {
  //     try{
  //           const { contractId, description, progress } = req.body;

  //         const closedContract = await allUserUseCases.closeContractUseCase.execute(contractId, description, progress);

  //         res.status(HttpStatusCode.OK).json({message: 'Contract closed successfully', success: true});
  //     }catch(err) {
  //         res.status(500).json({message: err.message, success: false});
  //     }
  // },

  boostAccount: async (req: Request, res: Response): Promise<void> => {
    try {
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const paymentUrl = await allUserUseCases.boostAccountUseCase.execute();

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        url: paymentUrl,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  bosstSuccess: async (req: Request, res: Response): Promise<void> => {
    try {
       if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const response = await allUserUseCases.boostSuccessUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  getSingleJobPost: async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobPostId } = req.params;
      const jobPost = await allUserUseCases.getSingleJobPostUseCase.execute(
        jobPostId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        jobPost,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  viewContracts: async (req: Request, res: Response): Promise<void> => {
    try { 
       if (!req.user || !req.user.id) {
          res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const { contractViewType } = req.params;
      const currentPage: number = Number(req.query.currentPage) || 1;
      const contracts = await allUserUseCases.viewContractsUseCase.execute(
        userId,
        contractViewType,
        currentPage
      );
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: contracts,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  submitProject: async (req: Request, res: Response): Promise<void> => {
    try {
      const { contractId } = req.params;
      const body = req.body.formData;
      const response = await allUserUseCases.submitProjectUseCase.execute(
        contractId,
        body
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  chatbot: async (req: Request, res: Response) => {
    try {
      const { userInput } = req.body;

      const response = await allUserUseCases.chatBotUseCase.execute(userInput);

      return res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        queryResult: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  addToWishlist: async (req: Request, res: Response) => {
    try {
      const { jobPostId } = req.body;
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const response = await allUserUseCases.addToWishlistUseCase.execute(
        userId,
        jobPostId
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  viewAllWishlist: async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const wishlist = await allUserUseCases.viewAllWishlistUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        wishlist,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  removeFromWishlist: async (req: Request, res: Response) => {
    try {
      const { wishlistId } = req.params; 
      const { jobPostId } = req.body; 
      const wishlist = await allUserUseCases.removeFromWishlistUseCase.execute(
        wishlistId,
        jobPostId
      );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  viewWalletUser: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
          res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const currentPage = Number(req.query.currentPage);
      const response = await allUserUseCases.viewWalletUserUseCase.execute(
        userId,
        currentPage
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        wallet: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  viewSingleContract: async (req: Request, res: Response): Promise<void> => {
    try {
      const { contractId } = req.params;
      const contract =
        await allUserUseCases.viewSingleContractUserUseCase.execute(contractId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contract,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  getAllInvites: async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);
      const response = await allUserUseCases.getAllInvitesUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        invites: response,
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  rejectInvite: async (req: Request, res: Response): Promise<void> => {
    try {
      const { inviteId } = req.params;
      const response = await allUserUseCases.rejectInviteUseCase.execute(
        inviteId
      );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },

  searchJobs: async (req: Request, res: Response): Promise<void> => {
    try {
      const { input }: { input: string } = req.body;
      const jobs = await allUserUseCases.searchJobsUseCase.execute(input);

      res
        .status(HttpStatusCode.OK)
        .json({
          message: StatusMessage[HttpStatusCode.OK],
          jobs,
          success: true,
        });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },
  withdrawMoneyByUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { amount, accountNumber, balance, type } = req.body;
      if (!req.user || !req.user.id) {
         res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);

      const response = await allUserUseCases.withdrawMoneyByUserUseCase.execute(
        userId,
        amount,
        accountNumber,
        balance,
        type
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
        success: true,
      });
    } catch (err) {
       if (err instanceof Error) { 
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          success: false,
        });
      }
      return;
    }
  },
};
