import express from "express"; 
const clientRouter = express.Router();
import { clientController } from "../controllers/clientCtrl"; 
import { userController } from "../controllers/userCtrl";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { requireRole } from "../middlewares/auth/requireRole"; 
import allRoles from '../../../helper/constants/role';


const {
  getHomeClient,
  getProfile,
  getAllNotifications,
  getUserProfile,
  getProposals,
  listAllJobs,
  getMyJobs,
  latestJobs,
  myContracts,
  viewContract,
  viewSubmissions,
  getallDevelopers,
  viewWallet,
  getAllChats,
  viewChat,
  signupClient,
  verifyOtp,
  resendOtp,
  loginClient,
  verifyEmail,
  resetPassword,
  googleLogin,
  logoutClient,
  editProfile,
  profileVerification,
  makePayment,
  createJobPost,
  rateAndReview,
  closeContract,
  createContract,
  sendMessage,
  rejectProposal,
  inviteUser
} = clientController;
const {
  getSingleJobPost
} = userController;
 const { CLIENT }: {CLIENT: string} = allRoles;



clientRouter.get("/getHome", verifyToken, requireRole(CLIENT), getHomeClient);
clientRouter.get("/profile/view/:clientId", verifyToken, requireRole(CLIENT), getProfile);
clientRouter.get("/notifications/:clientId", verifyToken, requireRole(CLIENT), getAllNotifications);
clientRouter.get("/userProfile/view/:userId", verifyToken, requireRole(CLIENT), getUserProfile);
clientRouter.get('/job-view/:jobPostId',verifyToken, requireRole(CLIENT), getSingleJobPost);
clientRouter.get("/job/proposals/:clientId", verifyToken, requireRole(CLIENT), getProposals);
clientRouter.get("/jobs/all-jobs/:clientId", verifyToken, requireRole(CLIENT), listAllJobs);
clientRouter.get("/jobs/my-jobs/:clientId", verifyToken, requireRole(CLIENT), getMyJobs);
clientRouter.get("/jobs/latest-jobs/:clientId", verifyToken, requireRole(CLIENT), latestJobs);
clientRouter.get("/job/myContracts/:clientId", verifyToken, requireRole(CLIENT), myContracts);
clientRouter.get("/contract/:contractId", verifyToken, requireRole(CLIENT), viewContract);
clientRouter.get("/contracts/submissions/:clientId", verifyToken, requireRole(CLIENT), viewSubmissions);
clientRouter.get("/developers/allDevelopers", verifyToken, requireRole(CLIENT), getallDevelopers);
clientRouter.get("/wallet/view/:clientId", verifyToken, requireRole(CLIENT), viewWallet);
clientRouter.get("/allChat/view/:roleId", verifyToken, requireRole(CLIENT), getAllChats);
clientRouter.get("/chat/view/:roleType/:roleId/:targetId", verifyToken, requireRole(CLIENT), clientController.viewChat);

clientRouter.post("/signup", signupClient);
clientRouter.post("/verify-otp", verifyOtp);
clientRouter.post("/resend-otp", resendOtp);
clientRouter.post("/login", loginClient);
clientRouter.post("/verify-email", verifyEmail);
clientRouter.post("/resetPassword/:clientId", resetPassword);
clientRouter.post("/googleLogin", googleLogin);
clientRouter.post("/logout", logoutClient);

clientRouter.post("/profile/verify/:clientId", verifyToken, requireRole(CLIENT), profileVerification);
clientRouter.post("/jobPost/payment-stripe/:clientId",verifyToken, requireRole(CLIENT), makePayment );
clientRouter.post("/payment/success/:clientId", createJobPost);
clientRouter.post("/rate-user/:notificationId", rateAndReview); 
clientRouter.post("/project/submit/approval", closeContract);
clientRouter.post('/job/createContract', verifyToken, requireRole(CLIENT), createContract); 
clientRouter.post("/chat/sendMessage", verifyToken, requireRole(CLIENT), sendMessage);
clientRouter.post("/invite/user",verifyToken, requireRole(CLIENT), inviteUser); 
// clientRouter.post( "/profile/edit/:clientId", editProfile);   
clientRouter.post("/profile/edit/:clientId",verifyToken, requireRole(CLIENT), editProfile);
clientRouter.put('/job/proposal/reject',verifyToken, requireRole(CLIENT), rejectProposal);

 

export default clientRouter;
