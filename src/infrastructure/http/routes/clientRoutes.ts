import express, { Router } from "express";
import refreshToken from "../middlewares/auth/refreshToken";
import { clientController } from "../controllers/clientCtrl";
import { userController } from "../controllers/userCtrl";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { requireRole } from "../middlewares/auth/requireRole";
import { allRoles } from "../../../helper/constants/enums";
import { NotificationController } from "../controllers/notificationCtrl";
import { InviteController } from "../controllers/inviteCtrl";

const {
  signupClient,
  verifyOtp,
  resendOtp,
  loginClient,
  verifyEmail,
  resetPassword,
  googleLogin,
  logoutClient,
  getHomeClient,
  trendingJobs,
  getSelectedJobs,
  getProposals,
  viewContracts,
  makePayment,
  createJobPost,
  getProfile,
  profileVerification,
  editProfile,
  getUserProfile,
  createContract,
  viewSubmissions,
  getallDevelopers,
  closeContract,
  rejectContract,
  viewWallet,
  listAllJobs,
  inviteJobsList,
  getSingleJobPost,
  rejectProposal,
  getAllChats,
  viewChat,
  rateAndReview,
  sendMessage,
  searchDevlopers,
  withdrawMoneyByClient,
} = clientController;
const { viewSingleContract } = userController;
const { CLIENT }: { CLIENT: string } = allRoles;

const { getAllNotificationsClient } = new NotificationController();
const { inviteUser, viewInvite } = new InviteController();

class ClientRoute {
  public router: Router;
  constructor() {
    this.router = Router();

    this.initializeGetRoutes();
    this.initializePostAndPutRoutes();
  }

  initializeGetRoutes(): void {
    this.router.get(
      "/getHome",
      verifyToken,
      requireRole(CLIENT),
      getHomeClient
    );
    this.router.get(
      "/trendingJobs",
      verifyToken,
      requireRole(CLIENT),
      trendingJobs
    );
    this.router.get("/profile", verifyToken, requireRole(CLIENT), getProfile);
    this.router.get(
      "/userProfile/:userId",
      verifyToken,
      requireRole(CLIENT),
      getUserProfile
    );
    this.router.get(
      "/developers",
      verifyToken,
      requireRole(CLIENT),
      getallDevelopers
    );
    this.router.get(
      "/listAllJobs",
      verifyToken,
      requireRole(CLIENT),
      listAllJobs
    );
    this.router.get(
      "/inviteJobsList",
      verifyToken,
      requireRole(CLIENT),
      inviteJobsList
    );
    this.router.get(
      "/jobs/:jobsType",
      verifyToken,
      requireRole(CLIENT),
      getSelectedJobs
    );
    this.router.get(
      "/job/:jobPostId",
      verifyToken,
      requireRole(CLIENT),
      getSingleJobPost
    );
    this.router.get(
      "/proposals/:proposalType",
      verifyToken,
      requireRole(CLIENT),
      getProposals
    );
    this.router.get(
      "/contracts/:contractViewType",
      verifyToken,
      requireRole(CLIENT),
      viewContracts
    );
    this.router.get(
      "/contract/:contractId",
      verifyToken,
      requireRole(CLIENT),
      viewSingleContract
    );
    this.router.get(
      "/invites/:inviteType",
      verifyToken,
      requireRole(CLIENT),
      viewInvite
    );
    this.router.get(
      "/contractsSubmissions",
      verifyToken,
      requireRole(CLIENT),
      viewSubmissions
    );
    this.router.get("/wallet", verifyToken, requireRole(CLIENT), viewWallet);
    this.router.get(
      "/allChat/view/:roleId",
      verifyToken,
      requireRole(CLIENT),
      getAllChats
    );
    this.router.get(
      "/chat/view/:roleType/:roleId/:targetId",
      verifyToken,
      requireRole(CLIENT),
      viewChat
    );
    this.router.get(
      "/notifications/:clientId",
      verifyToken,
      requireRole(CLIENT),
      getAllNotificationsClient
    );
  }

  initializePostAndPutRoutes(): void {
    this.router.post("/refresh-token", refreshToken);
    this.router.post("/projectApprove", closeContract);
    this.router.post("/jobPaymentStripe", makePayment);
    this.router.post(
      "/paymentSuccess",
      verifyToken,
      requireRole(CLIENT),
      createJobPost
    );
    this.router.post(
      "/profile/verify",
      verifyToken,
      requireRole(CLIENT),
      profileVerification
    );
    this.router.post(
      "/profile/edit",
      verifyToken,
      requireRole(CLIENT),
      editProfile
    );
    this.router.post(
      "/searchDevelopers",
      verifyToken,
      requireRole(CLIENT),
      searchDevlopers
    );
    this.router.post(
      "/createContract",
      verifyToken,
      requireRole(CLIENT),
      createContract
    );
    this.router.post(
      "/chat/sendMessage",
      verifyToken,
      requireRole(CLIENT),
      sendMessage
    );
    this.router.post(
      "/contractSubmitReject",
      verifyToken,
      requireRole(CLIENT),
      rejectContract
    );
    this.router.post(
      "/inviteUser",
      verifyToken,
      requireRole(CLIENT),
      inviteUser
    );
    this.router.post(
      "/rate-user/:notificationId",
      verifyToken,
      requireRole(CLIENT),
      rateAndReview
    );
    this.router.post(
      "/withdrawMoney",
      verifyToken,
      requireRole(CLIENT),
      withdrawMoneyByClient
    );
    this.router.post("/signup", signupClient);
    this.router.post("/verify-otp", verifyOtp);
    this.router.post("/resend-otp", resendOtp);
    this.router.post("/login", loginClient);
    this.router.post("/verify-email", verifyEmail);
    this.router.post("/resetPassword/:clientId", resetPassword);
    this.router.post("/googleLogin", googleLogin);
    this.router.post("/logout", logoutClient);
    this.router.put(
      "/proposalReject",
      verifyToken,
      requireRole(CLIENT),
      rejectProposal
    );
  }
}

export default ClientRoute;
