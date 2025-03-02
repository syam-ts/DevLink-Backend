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
  rejectProposal,
  viewContracts,
  
  viewSubmissions,
   
  createContract,
  getProfile,
  getAllNotifications,
  getUserProfile,
  getallDevelopers,
  viewWallet,
  getAllChats,
  viewChat,
  editProfile,
  profileVerification,
  makePayment,
  createJobPost,
  rateAndReview,
  closeContract,
  sendMessage,
  inviteUser,
  rejectContract
} = clientController;
const {
  getSingleJobPost
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



clientRouter.post('/job/createContract', verifyToken, requireRole(CLIENT), createContract); 
clientRouter.get("/profile/view/:clientId", verifyToken, requireRole(CLIENT), getProfile);
clientRouter.get("/notifications/:clientId", verifyToken, requireRole(CLIENT), getAllNotifications);
clientRouter.get("/userProfile/view/:userId", verifyToken, requireRole(CLIENT), getUserProfile);
  // clientRouter.get("/contract/:contractId", verifyToken, requireRole(CLIENT), viewContract);
clientRouter.get("/wallet-view/:clientId", verifyToken, requireRole(CLIENT), viewWallet);
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
clientRouter.post("/profile/edit/:clientId",verifyToken, requireRole(CLIENT), editProfile);
clientRouter.post("/invite/user",verifyToken, requireRole(CLIENT), inviteUser); 
clientRouter.post("/payment/success/:clientId", verifyToken, requireRole(CLIENT),createJobPost);
clientRouter.post("/project-submit/reject", verifyToken, requireRole(CLIENT), rejectContract);
clientRouter.post("/rate-user/:notificationId",verifyToken, requireRole(CLIENT), rateAndReview); 
clientRouter.post("/chat/sendMessage", verifyToken, requireRole(CLIENT), sendMessage);
// clientRouter.post( "/profile/edit/:clientId", editProfile);   
clientRouter.put('/proposalReject',verifyToken, requireRole(CLIENT), rejectProposal);
clientRouter.post('/refresh-token', refreshToken);

 

export default clientRouter;
