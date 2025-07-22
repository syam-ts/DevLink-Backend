import express, { Router } from "express";
import refreshToken from "../../middleware/auth/refreshToken";
import { clientController } from "../../controllers/clientCtrl";
import { verifyToken } from "../../middleware/auth/verifyToken";
import { requireRole } from "../../middleware/auth/requireRole";
import { allRoles } from "../../../helper/constants/enums";
import { NotificationController } from "../../controllers/notificationCtrl";
import { InviteController } from "../../controllers/inviteCtrl";
import { UserController } from "../../controllers/userCtrl";
import { JobpostController } from "../../controllers/jobPostCtrl";

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
  getProposals,
  viewContracts,
  makePayment,
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
  rejectProposal,
  getAllChats,
  viewChat,
  rateAndReview,
  sendMessage,
  searchDevlopers,
  withdrawMoneyByClient,
} = clientController;
const { viewSingleContract } = new UserController();
const { CLIENT }: { CLIENT: string } = allRoles;

const { getAllNotificationsClient } = new NotificationController();
const { inviteUser, viewInvite } = new InviteController();

class ClientRoute {

  public router: Router;
  private jobpostController: JobpostController;

  constructor() {
    this.router = Router();
    this.jobpostController = new JobpostController();

    this.initializeGetRoutes();
    this.initializePostAndPutRoutes();
  }


  initializeGetRoutes(): void {
    this.router.get("/getHome", verifyToken, requireRole(CLIENT), getHomeClient);
    this.router.get("/trendingJobs", verifyToken, requireRole(CLIENT), this.jobpostController.trendingJobs);
    this.router.get("/profile", verifyToken, requireRole(CLIENT), getProfile);
    this.router.get("/userProfile/:userId", verifyToken, requireRole(CLIENT), getUserProfile);
    this.router.get("/developers", verifyToken, requireRole(CLIENT), getallDevelopers);
    this.router.get("/listAllJobs", verifyToken, requireRole(CLIENT), this.jobpostController.listAllJobs);
    this.router.get("/inviteJobsList", verifyToken, requireRole(CLIENT), this.jobpostController.inviteJobsList);
    this.router.get("/jobs/:jobsType", verifyToken, requireRole(CLIENT), this.jobpostController.getSelectedJobs);
    this.router.get("/job/:jobPostId", verifyToken, requireRole(CLIENT), this.jobpostController.getSingleJobPost);
    this.router.get("/proposals/:proposalType", verifyToken, requireRole(CLIENT), getProposals);
    this.router.get("/contracts/:contractViewType", verifyToken, requireRole(CLIENT), viewContracts);
    this.router.get("/contract/:contractId", verifyToken, requireRole(CLIENT), viewSingleContract);
    this.router.get("/invites/:inviteType", verifyToken, requireRole(CLIENT), viewInvite);
    this.router.get("/contractsSubmissions", verifyToken, requireRole(CLIENT), viewSubmissions);
    this.router.get("/wallet", verifyToken, requireRole(CLIENT), viewWallet);
    this.router.get("/allChat/view/:roleId", verifyToken, requireRole(CLIENT), getAllChats);
    this.router.get("/chat/view/:roleType/:roleId/:targetId", verifyToken, requireRole(CLIENT), viewChat);
    this.router.get("/notifications/:clientId", verifyToken, requireRole(CLIENT), getAllNotificationsClient);
  }


  initializePostAndPutRoutes(): void {
    this.router.post("/refresh-token", refreshToken);
    this.router.post("/projectApprove", closeContract);
    this.router.post("/jobPaymentStripe", makePayment);
    this.router.post("/paymentSuccess", verifyToken, requireRole(CLIENT), this.jobpostController.createJobPost);
    this.router.post("/profile/verify", verifyToken, requireRole(CLIENT), profileVerification);
    this.router.post("/profile/edit", verifyToken, requireRole(CLIENT), editProfile);
    this.router.post("/searchDevelopers", verifyToken, requireRole(CLIENT), searchDevlopers);
    this.router.post("/createContract", verifyToken, requireRole(CLIENT), createContract);
    this.router.post("/chat/sendMessage", verifyToken, requireRole(CLIENT), sendMessage);
    this.router.post("/contractSubmitReject", verifyToken, requireRole(CLIENT), rejectContract);
    this.router.post("/inviteUser", verifyToken, requireRole(CLIENT), inviteUser);
    this.router.post("/rate-user/:notificationId", verifyToken, requireRole(CLIENT), rateAndReview);
    this.router.post("/withdrawMoney", verifyToken, requireRole(CLIENT), withdrawMoneyByClient);
    this.router.post("/signup", signupClient);
    this.router.post("/verify-otp", verifyOtp);
    this.router.post("/resend-otp", resendOtp);
    this.router.post("/login", loginClient);
    this.router.post("/verify-email", verifyEmail);
    this.router.post("/resetPassword/:clientId", resetPassword);
    this.router.post("/googleLogin", googleLogin);
    this.router.post("/logout", logoutClient);
    this.router.put("/proposalReject", verifyToken, requireRole(CLIENT), rejectProposal);
  }
}

export default ClientRoute;
