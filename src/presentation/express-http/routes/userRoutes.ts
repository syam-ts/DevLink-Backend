import { Router } from "express";
import { UserController } from "../../controllers/userCtrl";
import { verifyToken } from "../../middleware/auth/verifyToken";
import { ClientController } from "../../controllers/clientCtrl";
import refreshToken from "../../middleware/auth/refreshToken";
import { requireRole } from "../../middleware/auth/requireRole";
import { allRoles } from "../../../helper/constants/enums";
import { NotificationController } from "../../controllers/notificationCtrl";
import { InviteController } from "../../controllers/inviteCtrl";

class UserRoute {
    private USER: string;
    public router: Router;
    private userController: UserController;
    private notificationController: NotificationController;
    private inviteController: InviteController;
    private clientController: ClientController;

    constructor() {

        this.USER = allRoles.USER;
        this.router = Router();
        this.userController = new UserController();
        this.notificationController = new NotificationController();
        this.inviteController = new InviteController();
        this.clientController = new ClientController();

        this.initializeGetRoutes();
        this.initializePostRoutes();
        this.initializePutAndPatchRoutes();
    }


    public initializeGetRoutes(): void {

        this.router.get("/getHome", this.userController.getHomeUser);
        this.router.get("/home/:type", this.userController.listHomeJobs);
        this.router.get("/jobs/:jobsType", verifyToken, requireRole(this.USER), this.userController.getSelectedJobs);
        this.router.get("/proposals/:proposalType", verifyToken, requireRole(this.USER), this.userController.viewProposals);
        this.router.get("/contracts/:contractViewType", verifyToken, requireRole(this.USER), this.userController.viewContracts);
        this.router.get("/profile/:type", verifyToken, requireRole(this.USER), this.userController.getProfile);
        this.router.get("/wishlist", verifyToken, requireRole(this.USER), this.userController.viewAllWishlist);
        this.router.get("/job/:jobPostId", verifyToken, requireRole(this.USER), this.userController.getSingleJobPost);
        this.router.get("/contract/:contractId", verifyToken, requireRole(this.USER), this.userController.viewSingleContract);
        this.router.get("/notifications/:userId", verifyToken, requireRole(this.USER), this.notificationController.allNotifications);
        this.router.get("/allChat/view/:roleId", this.clientController.getAllChats);
        this.router.get("/chat/:memberId", verifyToken, requireRole(this.USER), this.notificationController.allNotifications);
        this.router.get("/invites", verifyToken, requireRole(this.USER), this.inviteController.getAllInvites);
        this.router.get("/chat/view/:roleType/:roleId/:targetId", this.clientController.viewChat);
        this.router.get("/wallet", verifyToken, requireRole(this.USER), this.userController.viewWalletUser);
    }


    public initializePostRoutes(): void {
        this.router.post("/addToWishlist", verifyToken, requireRole(this.USER), this.userController.addToWishlist);
        this.router.post("/boostProfile", verifyToken, requireRole(this.USER), this.userController.boostAccount);
        this.router.post("/withdrawMoney", verifyToken, requireRole(this.USER), this.userController.withdrawMoneyByUser);
        this.router.post("/createProposal", verifyToken, requireRole(this.USER), this.userController.createProposal);
        this.router.post("/searchJobs", verifyToken, requireRole(this.USER), this.userController.searchJobs);
        this.router.post("/signup", this.userController.signupUser);
        this.router.post("/verify-otp", this.userController.verifyOtp);
        this.router.post("/resend-otp", this.userController.resendOtp);
        this.router.post("/verify-email", this.userController.verifyEmail);
        this.router.post("/resetPassword/:userId", this.userController.resetPassword);
        this.router.post("/login", this.userController.loginUser);
        this.router.post("/googleLogin", this.userController.googleLogin);
        this.router.post("/logout", this.userController.logoutUser);
        this.router.post("/project/submit/:contractId", verifyToken, requireRole(this.USER), this.userController.submitProject);
        this.router.post("/chat/sendMessage", verifyToken, requireRole(this.USER), this.clientController.sendMessage);
        this.router.post("/chatbot", verifyToken, requireRole(this.USER), this.userController.chatbot);
        this.router.post("/refresh-token", refreshToken);
    }


    public initializePutAndPatchRoutes(): void {
        this.router.put("/profileAlter/:type", verifyToken, requireRole(this.USER), this.userController.alterProfile);
        this.router.patch("/profileBoostSuccess", verifyToken, requireRole(this.USER), this.userController.bosstSuccess);
        this.router.patch("/invite-reject/:inviteId", verifyToken, requireRole(this.USER), this.inviteController.rejectInvite);
        this.router.patch("/removeFromWishlist/:wishlistId", verifyToken, requireRole(this.USER), this.userController.removeFromWishlist);
    }
}

export default UserRoute;
