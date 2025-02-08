import express from "express";
import jwt from "jsonwebtoken";
const clientRouter = express.Router();
import { clientController } from "../controllers/clientCtrl";
import { ClientModel } from "../../../domain/entities/Client";
import { verifyToken } from "../middlewares/auth/verifyToken";
// import { requireRole } from "../middlewares/auth/requireRole";


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
rateUser,
closeContract,
createContract,
sendMessage, 
rejectProposal,
} = clientController;

 
clientRouter.get( "/getHome", verifyToken, getHomeClient );
clientRouter.get( "/profile/view/:clientId", verifyToken,getProfile); 
clientRouter.get( "/notifications/:clientId", verifyToken,getAllNotifications );
clientRouter.get("/userProfile/view/:userId",getUserProfile);
clientRouter.get( "/job/proposals/:clientId", verifyToken,getProposals);
clientRouter.get( "/jobs/all-jobs/:clientId", verifyToken, listAllJobs);
clientRouter.get( "/jobs/my-jobs/:clientId", verifyToken, getMyJobs);
clientRouter.get( "/jobs/latest-jobs/:clientId", verifyToken, latestJobs);
clientRouter.get( "/job/myContracts/:clientId", verifyToken, myContracts);
clientRouter.get( "/contract/:contractId",viewContract);
clientRouter.get( "/contracts/submissions/:clientId", viewSubmissions);
clientRouter.get( "/developers/allDevelopers",getallDevelopers);
clientRouter.get( "/wallet/view/:clientId",viewWallet); 
clientRouter.get( "/allChat/view/:roleId",getAllChats); 
clientRouter.get( "/chat/view/:roleType/:roleId/:targetId", clientController.viewChat);


clientRouter.post("/signup", signupClient);
clientRouter.post("/verify-otp", verifyOtp);
clientRouter.post("/resend-otp", resendOtp);
clientRouter.post("/login", loginClient);
clientRouter.post("/verify-email", verifyEmail);
clientRouter.post("/resetPassword/:clientId", resetPassword);
clientRouter.post("/googleLogin", googleLogin);
clientRouter.post("/logout", logoutClient);
clientRouter.post( "/profile/verification/:clientId", profileVerification);

//payment and new jobpost creation phase
clientRouter.post(
  "/jobPost/payment-stripe/:clientId", makePayment
);
clientRouter.post("/payment/success/:clientId", createJobPost);
clientRouter.post("/rate/user/:notificationId", rateUser);

clientRouter.post("/project/submit/approval", closeContract);
clientRouter.post('/job/createContract', createContract);


clientRouter.post("/chat/sendMessage", sendMessage);

// clientRouter.post( "/profile/edit/:clientId", editProfile);  


 clientRouter.put("/profile/edit/:clientId", editProfile);
 clientRouter.put('/job/proposal/reject', rejectProposal);



clientRouter.get("/refresh-token", async (req: any, res: any) => {
  try {
    const refreshToken = req.cookies.jwtC;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const CLIENT_REFRESH_TOKEN: any = process.env.CLIENT_REFRESH_TOKEN;
    const CLIENT_ACCESS_TOKEN: any = process.env.CLIENT_ACCESS_TOKEN;

    const decoded: any = jwt.verify(refreshToken, CLIENT_REFRESH_TOKEN);

    const client = await ClientModel.findById(decoded.id);
    if (!client || client.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      CLIENT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign({ id: decoded.id }, CLIENT_REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    client.refreshToken = newRefreshToken;
    await client.save();

    res.cookie("jwtC", newRefreshToken, { httpOnly: true, secure: true });
    res.json({ accessTokenC: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default clientRouter;
