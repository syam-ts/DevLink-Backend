import { Router } from "express";
import refreshToken from "../../middleware/auth/refreshToken";
import { verifyToken } from "../../middleware/auth/verifyToken";
import { requireRole } from "../../middleware/auth/requireRole";
import { allRoles } from "../../../helper/constants/enums";
import { NotificationController } from "../../controllers/notificationCtrl";
import { InviteController } from "../../controllers/inviteCtrl";
import { UserController } from "../../controllers/userCtrl";
import { JobpostController } from "../../controllers/jobPostCtrl";
import { ClientController } from "../../controllers/clientCtrl";

const { CLIENT }: { CLIENT: string } = allRoles;


class ClientRoute {

  public router: Router;
  private userController: UserController;
  private notificationController: NotificationController;
  private inviteController: InviteController; 
  private jobpostController: JobpostController;
  private clientController: ClientController;

  constructor() {
    
    this.router = Router();
    this.userController = new UserController();
    this.notificationController = new NotificationController();
    this.inviteController = new InviteController();
    this.jobpostController = new JobpostController();
    this.clientController = new ClientController();

    this.initializeGetRoutes();
    this.initializePostAndPutRoutes();
  }


  initializeGetRoutes(): void {
    this.router.get("/getHome", verifyToken, requireRole(CLIENT), this.clientController.getHomeClient);
    this.router.get("/trendingJobs", verifyToken, requireRole(CLIENT), this.jobpostController.trendingJobs);
    this.router.get("/profile", verifyToken, requireRole(CLIENT), this.clientController.getProfile);
    this.router.get("/userProfile/:userId", verifyToken, requireRole(CLIENT), this.clientController.getUserProfile);
    this.router.get("/developers", verifyToken, requireRole(CLIENT), this.clientController.getallDevelopers);
    this.router.get("/listAllJobs", verifyToken, requireRole(CLIENT), this.jobpostController.listAllJobs);
    this.router.get("/inviteJobsList", verifyToken, requireRole(CLIENT), this.jobpostController.inviteJobsList);
    this.router.get("/jobs/:jobsType", verifyToken, requireRole(CLIENT), this.jobpostController.getSelectedJobs);
    this.router.get("/job/:jobPostId", verifyToken, requireRole(CLIENT), this.jobpostController.getSingleJobPost);
    this.router.get("/proposals/:proposalType", verifyToken, requireRole(CLIENT), this.clientController.getProposals);
    this.router.get("/contracts/:contractViewType", verifyToken, requireRole(CLIENT), this.clientController.viewContracts);
    this.router.get("/contract/:contractId", verifyToken, requireRole(CLIENT), this.userController.viewSingleContract);
    this.router.get("/invites/:inviteType", verifyToken, requireRole(CLIENT), this.inviteController.viewInvite);
    this.router.get("/contractsSubmissions", verifyToken, requireRole(CLIENT), this.clientController.viewSubmissions);
    this.router.get("/wallet", verifyToken, requireRole(CLIENT), this.clientController.viewWallet);
    this.router.get("/allChat/view/:roleId", verifyToken, requireRole(CLIENT), this.clientController.getAllChats);
    this.router.get("/chat/view/:roleType/:roleId/:targetId", verifyToken, requireRole(CLIENT), this.clientController.viewChat);
    this.router.get("/notifications/:clientId", verifyToken, requireRole(CLIENT), this.notificationController.getAllNotificationsClient);
  }


  initializePostAndPutRoutes(): void {
    this.router.post("/refresh-token", refreshToken);
    this.router.post("/projectApprove", this.clientController.closeContract);
    this.router.post("/jobPaymentStripe", this.clientController.makePayment);
    this.router.post("/paymentSuccess", verifyToken, requireRole(CLIENT), this.jobpostController.createJobPost);
    this.router.post("/profile/verify", verifyToken, requireRole(CLIENT), this.clientController.profileVerification);
    this.router.post("/profile/edit", verifyToken, requireRole(CLIENT), this.clientController.editProfile);
    this.router.post("/searchDevelopers", verifyToken, requireRole(CLIENT), this.clientController.searchDevlopers);
    this.router.post("/createContract", verifyToken, requireRole(CLIENT), this.clientController.createContract);
    this.router.post("/chat/sendMessage", verifyToken, requireRole(CLIENT), this.clientController.sendMessage);
    this.router.post("/contractSubmitReject", verifyToken, requireRole(CLIENT), this.clientController.rejectContract);
    this.router.post("/inviteUser", verifyToken, requireRole(CLIENT), this.inviteController.inviteUser);
    this.router.post("/rate-user/:notificationId", verifyToken, requireRole(CLIENT), this.clientController.rateAndReview);
    this.router.post("/withdrawMoney", verifyToken, requireRole(CLIENT), this.clientController.withdrawMoneyByClient);
    this.router.post("/signup", this.clientController.signupClient);
    this.router.post("/verify-otp", this.clientController.verifyOtp);
    this.router.post("/resend-otp", this.clientController.resendOtp);
    this.router.post("/login", this.clientController.loginClient);
    this.router.post("/verify-email", this.clientController.verifyEmail);
    this.router.post("/resetPassword/:clientId", this.clientController.resetPassword);
    this.router.post("/googleLogin", this.clientController.googleLogin);
    this.router.post("/logout", this.clientController.logoutClient);
    this.router.put("/proposalReject", verifyToken, requireRole(CLIENT), this.clientController.rejectProposal);
  }
}

export default ClientRoute;
