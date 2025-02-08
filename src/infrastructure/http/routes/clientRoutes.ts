import express from "express";
import jwt from "jsonwebtoken";
const clientRouter = express.Router();
import { clientController } from "../controllers/clientCtrl";
import { ClientModel } from "../../../domain/entities/Client";
import { verifyToken } from "../middlewares/auth/verifyToken";
// import { requireRole } from "../middlewares/auth/requireRole";

clientRouter.get( "/allclient",  clientController.allUser );



clientRouter.get( "/getHome", verifyToken,  clientController.getHomeClient );
clientRouter.get( "/profile/view/:clientId", verifyToken,  clientController.getProfile); 
clientRouter.get( "/notifications/:clientId", verifyToken,  clientController.getAllNotifications );
clientRouter.get("/userProfile/view/:userId", clientController.getUserProfile);
clientRouter.get( "/job/proposals/:clientId", verifyToken,  clientController.getProposals);
clientRouter.get( "/jobs/all-jobs/:clientId", verifyToken,  clientController.listAllJobs);
clientRouter.get( "/jobs/my-jobs/:clientId", verifyToken,  clientController.getMyJobs);
clientRouter.get( "/jobs/latest-jobs/:clientId", verifyToken,  clientController.latestJobs);
clientRouter.get( "/job/myContracts/:clientId", verifyToken,  clientController.myContracts);
clientRouter.get( "/contract/:contractId", clientController.viewContract);
clientRouter.get( "/contracts/submissions/:clientId",  clientController.viewSubmissions);
clientRouter.get( "/developers/allDevelopers", clientController.getallDevelopers);
clientRouter.get( "/wallet/view/:clientId", clientController.viewWallet);

clientRouter.get( "/allChat/view/:roleId", clientController.getAllChats);


clientRouter.get( "/chat/view/:roleType/:roleId/:targetId", clientController.viewChat);


clientRouter.post("/signup", clientController.signupClient);
clientRouter.post("/verify-otp", clientController.verifyOtp);
clientRouter.post("/resend-otp", clientController.resendOtp);
clientRouter.post("/login", clientController.loginClient);
clientRouter.post("/verify-email", clientController.verifyEmail);
clientRouter.post("/resetPassword/:clientId", clientController.resetPassword);
clientRouter.post("/googleLogin", clientController.googleLogin);
clientRouter.post("/logout", clientController.logoutClient);
clientRouter.post( "/profile/edit/:clientId", verifyToken,  clientController.editProfile);  
clientRouter.post( "/profile/verification/:clientId", verifyToken,  clientController.profileVerification);

//payment and new jobpost creation phase
clientRouter.post(
"/jobPost/payment-stripe/:clientId", clientController.makePayment
);
clientRouter.post("/payment/success/:clientId", clientController.createJobPost);
clientRouter.post("/rate/user/:notificationId",  clientController.rateUser);

clientRouter.post("/project/submit/approval",  clientController.closeContract);
 clientRouter.post('/job/createContract',verifyToken, clientController.createContract);
  

 clientRouter.post("/chat/sendMessage", verifyToken,  clientController.sendMessage);
 
 clientRouter.put("/profile/edit/:clientId", verifyToken,  clientController.editProfile);
 clientRouter.put('/job/proposal/reject', clientController.rejectProposal);



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
