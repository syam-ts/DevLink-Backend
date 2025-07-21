import express, { Router } from "express";
import { userController } from "../controllers/userCtrl";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { clientController } from "../controllers/clientCtrl";
import refreshToken from "../middlewares/auth/refreshToken";
import { requireRole } from "../middlewares/auth/requireRole";
import { allRoles } from "../../../helper/constants/enums";
import { NotificationController } from "../controllers/notificationCtrl";

const {
    signupUser,
    verifyOtp,
    resendOtp,
    verifyEmail,
    resetPassword,
    loginUser,
    googleLogin,
    logoutUser,
    getHomeUser,
    listHomeJobs,
    getSelectedJobs,
    viewProposals,
    viewContracts,
    getProfile,
    alterProfile,
    boostAccount,
    bosstSuccess,
    viewAllWishlist,
    addToWishlist,
    removeFromWishlist,
    viewWalletUser,
    getSingleJobPost,
    createProposal,
    viewSingleContract,
    withdrawMoneyByUser,
    searchJobs,
    submitProject,
    getAllInvites,
    rejectInvite,
    chatbot, 
} = userController;
const { USER }: { USER: string } = allRoles;

const { allNotifications } = new NotificationController()

class UserRoute {
    public router: Router;
    constructor() {
        this.router = Router();

        this.initializeGetRoutes();
        this.initializePostRoutes();
        this.initializePutAndPatchRoutes();
    }

    public initializeGetRoutes(): void {
        this.router.get("/getHome", getHomeUser);
        this.router.get("/home/:type", listHomeJobs);
        this.router.get(
            "/jobs/:jobsType",
            verifyToken,
            requireRole(USER),
            getSelectedJobs
        );
        this.router.get(
            "/proposals/:proposalType",
            verifyToken,
            requireRole(USER),
            viewProposals
        );
        this.router.get(
            "/contracts/:contractViewType",
            verifyToken,
            requireRole(USER),
            viewContracts
        );
        this.router.get(
            "/profile/:type",
            verifyToken,
            requireRole(USER),
            getProfile
        );
        this.router.get(
            "/wishlist",
            verifyToken,
            requireRole(USER),
            viewAllWishlist
        );
        this.router.get(
            "/job/:jobPostId",
            verifyToken,
            requireRole(USER),
            getSingleJobPost
        );
        this.router.get(
            "/contract/:contractId",
            verifyToken,
            requireRole(USER),
            viewSingleContract
        );
        this.router.get(
            "/notifications/:userId",
            verifyToken,
            requireRole(USER),
            allNotifications
        );
        this.router.get("/allChat/view/:roleId", clientController.getAllChats);
        this.router.get(
            "/chat/:memberId",
            verifyToken,
            requireRole(USER),
            allNotifications
        );
        this.router.get("/invites", verifyToken, requireRole(USER), getAllInvites);
        this.router.get(
            "/chat/view/:roleType/:roleId/:targetId",
            clientController.viewChat
        );
        this.router.get("/wallet", verifyToken, requireRole(USER), viewWalletUser);
    }

    public initializePostRoutes(): void {
        this.router.post(
            "/addToWishlist",
            verifyToken,
            requireRole(USER),
            addToWishlist
        );
        this.router.post(
            "/boostProfile",
            verifyToken,
            requireRole(USER),
            boostAccount
        );
        this.router.post(
            "/withdrawMoney",
            verifyToken,
            requireRole(USER),
            withdrawMoneyByUser
        );
        this.router.post(
            "/createProposal",
            verifyToken,
            requireRole(USER),
            createProposal
        );
        this.router.post("/searchJobs", verifyToken, requireRole(USER), searchJobs);
        this.router.post("/signup", signupUser);
        this.router.post("/verify-otp", verifyOtp);
        this.router.post("/resend-otp", resendOtp);
        this.router.post("/verify-email", verifyEmail);
        this.router.post("/resetPassword/:userId", resetPassword);
        this.router.post("/login", loginUser);
        this.router.post("/googleLogin", googleLogin);
        this.router.post("/logout", logoutUser);
        this.router.post(
            "/project/submit/:contractId",
            verifyToken,
            requireRole(USER),
            submitProject
        );
        this.router.post(
            "/chat/sendMessage",
            verifyToken,
            requireRole(USER),
            clientController.sendMessage
        );
        this.router.post("/chatbot", verifyToken, requireRole(USER), chatbot);
        this.router.post("/refresh-token", refreshToken);
    }

    public initializePutAndPatchRoutes(): void {
        this.router.put(
            "/profileAlter/:type",
            verifyToken,
            requireRole(USER),
            alterProfile
        );
        this.router.patch(
            "/profileBoostSuccess",
            verifyToken,
            requireRole(USER),
            bosstSuccess
        );
        this.router.patch(
            "/invite-reject/:inviteId",
            verifyToken,
            requireRole(USER),
            rejectInvite
        );
        this.router.patch(
            "/removeFromWishlist/:wishlistId",
            verifyToken,
            requireRole(USER),
            removeFromWishlist
        );
    }
}

export default UserRoute;
