import { Request, Response } from "express";
import { allUserUseCases } from "../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../helper/constants/enums";
import { StatusMessage } from "../../helper/constants/stausMessages";
import generateTokens from "../../utils/generateTokens";
import { Error } from "mongoose";
import logger from "../../logger/logger";

export class UserController {

constructor() {
  
}

  async signupUser(req: Request, res: Response): Promise<void> {
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

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const user = await allUserUseCases.verifyUserUseCase.execute(req.body);
      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
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

  async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const user = await allUserUseCases.signupUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        newOtp: user,
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

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const response = await allUserUseCases.verifyEmailUseCase.execute(
        req.body.email
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

  async resetPassword(req: Request, res: Response): Promise<void> {
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

  async loginUser(req: Request, res: Response) {
    try {
      const user = await allUserUseCases.loginUseCase.execute(req.body);
      if (!user) {
        res
          .status(401)
          .json({ message: "Invalid credentials", success: false });
        return;
      }
      user.role = "user";
      if (!user.role) throw new Error("not eixist");
      const { accessToken, refreshToken } = generateTokens(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        user,
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

  async googleLogin(req: Request, res: Response) {
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
        secure: true,
        sameSite: "none",
      });

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        user,
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

  async getHomeUser(req: Request, res: Response): Promise<void> {
    try {
      const clients = await allUserUseCases.getHomeUseCase.execute();

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

  async getProfile(req: Request, res: Response): Promise<void> {
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

  async alterProfile(req: Request, res: Response): Promise<void> {
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

  async logoutUser(req: Request, res: Response): Promise<void> {
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

  async listHomeJobs(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;
      const response = await allUserUseCases.listHomeJobsUseCase.execute(type);

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

  async getSelectedJobs(req: Request, res: Response): Promise<void> {
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
        expertLevel: req.query.expertLevel as
          | "beginner"
          | "intermediate"
          | "advanced",
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

  async createProposal(req: Request, res: Response): Promise<void> {
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

  async viewProposals(req: Request, res: Response): Promise<void> {
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

  // async closingContract (req: Request, res: Response): Promise<void> {
  //     try{
  //           const { contractId, description, progress } = req.body;

  //         const closedContract = await allUserUseCases.closeContractUseCase.execute(contractId, description, progress);

  //         res.status(HttpStatusCode.OK).json({message: 'Contract closed successfully', success: true});
  //     }catch(err) {
  //         res.status(500).json({message: err.message, success: false});
  //     }
  // }

  async boostAccount(req: Request, res: Response): Promise<void> {
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

  async bosstSuccess(req: Request, res: Response): Promise<void> {
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

  async getSingleJobPost(req: Request, res: Response): Promise<void> {
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

  async submitProject(req: Request, res: Response): Promise<void> {
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

  async chatbot(req: Request, res: Response): Promise<void> {
    try {
      const { userInput } = req.body;

      const response = await allUserUseCases.chatBotUseCase.execute(userInput);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        queryResult: response,
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

  async addToWishlist(req: Request, res: Response) {
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

  async viewAllWishlist(req: Request, res: Response) {
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

  async removeFromWishlist(req: Request, res: Response) {
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

  async viewWalletUser(req: Request, res: Response): Promise<void> {
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
      const { contractId } = req.params;
      const contract =
        await allUserUseCases.viewSingleContractUserUseCase.execute(contractId);

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

  async searchJobs(req: Request, res: Response): Promise<void> {
    try {
      const { input }: { input: string } = req.body;
      const jobs = await allUserUseCases.searchJobsUseCase.execute(input);

      res.status(HttpStatusCode.OK).json({
        message: StatusMessage[HttpStatusCode.OK],
        jobs,
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
  async withdrawMoneyByUser(req: Request, res: Response): Promise<void> {
    try {
      const { amount, accountNumber, balance, type } = req.body;
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized", success: false });
      }
      const userId = String(req.user?.id);

      const response = await allUserUseCases.withdrawMoneyByUserUseCase.execute(
        userId,
        amount,
        accountNumber
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
}
