import express from "express"; 
const clientRouter = express.Router();
import refreshToken from '../middlewares/auth/refreshToken';
import { clientController } from "../controllers/clientCtrl"; 
import { userController } from "../controllers/userCtrl";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { requireRole } from "../middlewares/auth/requireRole"; 
import {allRoles} from '../../../helper/constants/enums';

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


  rejectProposal,
  getAllNotifications,
  getAllChats,
  viewChat,
  rateAndReview,
  sendMessage,
  inviteUser,
  listAllJobs
} = clientController;
const {
  getSingleJobPost,
  viewSingleContract
} = userController;
 const { CLIENT }: {CLIENT: string} = allRoles;

 
clientRouter.get("/getHome", verifyToken, requireRole(CLIENT), getHomeClient);
clientRouter.get("/trendingJobs", verifyToken, requireRole(CLIENT), trendingJobs);
clientRouter.get('/jobs/:jobsType', verifyToken, requireRole(CLIENT), getSelectedJobs); 
clientRouter.get('/job/:jobPostId',verifyToken, requireRole(CLIENT), getSingleJobPost); 
clientRouter.get("/proposals/:proposalType", verifyToken, requireRole(CLIENT), getProposals);
clientRouter.get('/contracts/:contractViewType', verifyToken, requireRole(CLIENT), viewContracts); 
clientRouter.get("/contractsSubmissions", verifyToken, requireRole(CLIENT), viewSubmissions);

clientRouter.get("/developers", verifyToken, requireRole(CLIENT), getallDevelopers);
clientRouter.post("/projectApprove", verifyToken, requireRole(CLIENT),closeContract);
clientRouter.post("/jobPaymentStripe",verifyToken, requireRole(CLIENT), makePayment );
clientRouter.post("/paymentSuccess", verifyToken, requireRole(CLIENT),createJobPost);
clientRouter.get("/profile", verifyToken, requireRole(CLIENT), getProfile);
clientRouter.get("/userProfile/:userId", verifyToken, requireRole(CLIENT), getUserProfile);
clientRouter.post("/profile/verify", verifyToken, requireRole(CLIENT), profileVerification);
clientRouter.post("/profile/edit",verifyToken, requireRole(CLIENT), editProfile);   
clientRouter.post("/signup", signupClient);
clientRouter.post("/verify-otp", verifyOtp);
clientRouter.post("/resend-otp", resendOtp);
clientRouter.post("/login", loginClient);
clientRouter.post("/verify-email", verifyEmail);
clientRouter.post("/resetPassword/:clientId", resetPassword);
clientRouter.post("/googleLogin", googleLogin);
clientRouter.post("/logout", logoutClient); 
clientRouter.post('/createContract', verifyToken, requireRole(CLIENT), createContract); 
clientRouter.get("/contract/:contractId", verifyToken, requireRole(CLIENT), viewSingleContract);  
clientRouter.post("/contractSubmitReject/:contractId", verifyToken, requireRole(CLIENT), rejectContract);
clientRouter.get("/wallet", verifyToken, requireRole(CLIENT), viewWallet);


//pending
clientRouter.get("/listAllJobs", verifyToken, requireRole(CLIENT), listAllJobs);


clientRouter.put('/proposalReject',verifyToken, requireRole(CLIENT), rejectProposal);
clientRouter.get("/allChat/view/:roleId", verifyToken, requireRole(CLIENT), getAllChats);
clientRouter.get("/chat/view/:roleType/:roleId/:targetId", verifyToken, requireRole(CLIENT), clientController.viewChat);
clientRouter.post("/chat/sendMessage", verifyToken, requireRole(CLIENT), sendMessage);
clientRouter.get("/notifications/:clientId", verifyToken, requireRole(CLIENT), getAllNotifications);
clientRouter.post("/rate-user/:notificationId",verifyToken, requireRole(CLIENT), rateAndReview);   
clientRouter.post("/invite/user",verifyToken, requireRole(CLIENT), inviteUser);  
clientRouter.post('/refresh-token', refreshToken);

 

export default clientRouter;
