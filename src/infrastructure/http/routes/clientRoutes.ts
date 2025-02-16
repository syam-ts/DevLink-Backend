import express from "express"; 
const clientRouter = express.Router();
import { clientController } from "../controllers/clientCtrl"; 
import { verifyToken } from "../middlewares/auth/verifyToken";
import { requireRole } from "../middlewares/auth/requireRole"; 


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


clientRouter.get("/getHome", verifyToken, requireRole('client'), getHomeClient);
clientRouter.get("/profile/view/:clientId", verifyToken, requireRole('client'), getProfile);
clientRouter.get("/notifications/:clientId", verifyToken, requireRole('client'), getAllNotifications);
clientRouter.get("/userProfile/view/:userId", verifyToken, requireRole('client'), getUserProfile);
clientRouter.get("/job/proposals/:clientId", verifyToken, requireRole('client'), getProposals);
clientRouter.get("/jobs/all-jobs/:clientId", verifyToken, requireRole('client'), listAllJobs);
clientRouter.get("/jobs/my-jobs/:clientId", verifyToken, requireRole('client'), getMyJobs);
clientRouter.get("/jobs/latest-jobs/:clientId", verifyToken, requireRole('client'), latestJobs);
clientRouter.get("/job/myContracts/:clientId", verifyToken, requireRole('client'), myContracts);
clientRouter.get("/contract/:contractId", verifyToken, requireRole('client'), viewContract);
clientRouter.get("/contracts/submissions/:clientId", verifyToken, requireRole('client'), viewSubmissions);
clientRouter.get("/developers/allDevelopers", verifyToken, requireRole('client'), getallDevelopers);
clientRouter.get("/wallet/view/:clientId", verifyToken, requireRole('client'), viewWallet);
clientRouter.get("/allChat/view/:roleId", verifyToken, requireRole('client'), getAllChats);
clientRouter.get("/chat/view/:roleType/:roleId/:targetId", verifyToken, requireRole('client'), clientController.viewChat);


clientRouter.post("/signup", signupClient);
clientRouter.post("/verify-otp", verifyOtp);
clientRouter.post("/resend-otp", resendOtp);
clientRouter.post("/login", loginClient);
clientRouter.post("/verify-email", verifyEmail);
clientRouter.post("/resetPassword/:clientId", resetPassword);
clientRouter.post("/googleLogin", googleLogin);
clientRouter.post("/logout", logoutClient);
clientRouter.post("/profile/verify/:clientId", verifyToken, requireRole('client'), profileVerification);

//Payment and New Jobpost creation phase   -------------->
clientRouter.post("/jobPost/payment-stripe/:clientId",verifyToken, requireRole('client'), makePayment );
clientRouter.post("/payment/success/:clientId", createJobPost);
clientRouter.post("/rate/user/:notificationId", rateAndReview); 
clientRouter.post("/project/submit/approval", closeContract);
clientRouter.post('/job/createContract', verifyToken, requireRole('client'), createContract); 
clientRouter.post("/chat/sendMessage", verifyToken, requireRole('client'), sendMessage);
clientRouter.post("/invite/user", inviteUser);

// clientRouter.post( "/profile/edit/:clientId", editProfile);  


clientRouter.put("/profile/edit/:clientId",verifyToken, requireRole('client'), editProfile);
clientRouter.put('/job/proposal/reject',verifyToken, requireRole('client'), rejectProposal);


 

export default clientRouter;
