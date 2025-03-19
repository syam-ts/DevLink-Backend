import { Request, Response } from "express";
import {
  allClientUseCases,
  allUserUseCases,
} from "../../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from "../../../utils/generateTokens";

export const userController = {
  signupUser: async (req: Request, res: Response) => {
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
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
    try {
      const user = await allUserUseCases.verifyUserUseCase.execute(req.body);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
    }
  },

  resendOtp: async (req: Request, res: Response) => {
    try {
      const user = await allUserUseCases.signupUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        newOtp: user,
        success: true,
      });
    } catch (err: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        success: false,
      });
    }
  },

  verifyEmail: async (req: Request, res: Response) => {
    try {
      const response = await allUserUseCases.verifyEmailUseCase.execute(
        req.body.email
      );

      res.status(HttpStatusCode.OK).json({
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
      let { userId } = req.params,
        { password } = req.body;
      const response = await allUserUseCases.resetPasswordUseCase.execute(
        userId,
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

  loginUser: async (req: Request, res: any) => {
    try {
      const { user } = await allUserUseCases.loginUseCase.execute(req.body);
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  googleLogin: async (req: Request, res: any) => {
    try {
      const user: any = await allUserUseCases.GoogleLoginUserUseCase.execute(
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  getHomeUser: async (req: Request, res: any) => {
    try {
      const clients = await allUserUseCases.getHomeUseCase.execute();

      return res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: clients,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  getProfile: async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const user = await allUserUseCases.getProfileUseCase.execute(userId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        data: user,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  alterProfile: async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      const { id: userId } = req.user;
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, sucess: false });
    }
  },

  logoutUser: async (req: Request, res: Response) => {
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

  listHomeJobs: async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      const response = await allUserUseCases.listHomeJobsUseCase.execute(type);

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

  getSelectedJobs: async (req: Request, res: Response) => {
    try {
      const { jobsType } = req.params;
      const { id: userId } = req.user;
      const currentPage: number = Number(req.query.currentPage) || 1;

      const response = await allUserUseCases.getSelectedJobsUseCase.execute(
        userId,
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

  createProposal: async (req: Request, res: Response) => {
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  viewProposals: async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const response = await allUserUseCases.viewProposalsUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        proposals: response,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  allNotifications: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const allNotifications =
        await allUserUseCases.allNotificationsUseCase.execute(userId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        notifications: allNotifications,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  // closingContract: async (req: Request, res: Response) => {
  //     try{
  //           const { contractId, description, progress } = req.body;

  //         const closedContract = await allUserUseCases.closeContractUseCase.execute(contractId, description, progress);

  //         res.status(HttpStatusCode.OK).json({message: 'Contract closed successfully', success: true});
  //     }catch(err: any) {
  //         res.status(500).json({message: err.message, success: false});
  //     }
  // },

  boostAccount: async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const paymentUrl = await allUserUseCases.boostAccountUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        url: paymentUrl,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  bosstSuccess: async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const response = await allUserUseCases.boostSuccessUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        response: response,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  getSingleJobPost: async (req: Request, res: Response) => {
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  viewContracts: async (req: Request, res: Response) => {
    try { 
      const { id: userId } = req.user;
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  submitProject: async (req: Request, res: Response) => {
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
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  chatbot: async (req: Request, res: any) => {
    try {
      const { userInput } = req.body;

      const response = await allUserUseCases.chatBotUseCase.execute(userInput);

      return res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        queryResult: response,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  addToWishlist: async (req: Request, res: any) => {
    try {
      const { jobPostId } = req.body;
      const userId = req.user.id;
      const response = await allUserUseCases.addToWishlistUseCase.execute(
        userId,
        jobPostId
      );

      res.status(HttpStatusCode.CREATED).json({
        message: StatusMessage[HttpStatusCode.CREATED],
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  viewAllWishlist: async (req: Request, res: any) => {
    try {
      const userId = req.user.id;
      const wishlist = await allUserUseCases.viewAllWishlistUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        wishlist,
        success: true,
      });
    } catch (err: any) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  removeFromWishlist: async (req: Request, res: any) => {
    try {
      const {wishlistId} = req.params;
      console.log('The wihsilstid: ', wishlistId);
      const wishlist = await allUserUseCases.removeFromWishlistUseCase.execute(
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

  viewWalletUser: async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const { currentPage } = req.query;
      const response = await allUserUseCases.viewWalletUserUseCase.execute(
        userId,
        currentPage
      );

      res.status(HttpStatusCode.OK).json({
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

  viewSingleContract: async (req: Request, res: Response) => {
    try {
      const { contractId } = req.params;
      const contract =
        await allUserUseCases.viewSingleContractUserUseCase.execute(contractId);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        contract,
        success: true,
      });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  getAllInvites: async (req: Request, res: Response) => {
    try {
      const { id: userId }: { id: string } = req.user;
      const response = await allUserUseCases.getAllInvitesUseCase.execute(
        userId
      );

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        invites: response,
        success: true,
      });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  rejectInvite: async (req: Request, res: Response) => {
    try {
      const { inviteId } = req.params;
      const response = await allUserUseCases.rejectInviteUseCase.execute(
        inviteId
      );

      res
        .status(HttpStatusCode.OK)
        .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },

  searchJobs: async (req: Request, res: Response) => {
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
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },
  withdrawMoneyByUser: async (req: Request, res: Response) => {
    try {
      const { amount, accountNumber, balance, type } = req.body;
      const { id: userId }: { id: string } = req.user;

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
    } catch (err: any) {
      res
        .status(500)
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  },
};
