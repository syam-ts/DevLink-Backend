import express from "express";
import jwt from "jsonwebtoken";
const clientRouter = express.Router();
import { clientController } from "../controllers/clientCtrl";
import { ClientModel } from "../../../domain/entities/Client";
import { verifyToken } from "../middlewares/auth/verifyToken";
import { requireRole } from "../middlewares/auth/requireRole";


clientRouter.get( "/getHome", verifyToken, requireRole("client"), clientController.getHomeClient );
clientRouter.get( "/profile/view/:clientId", verifyToken, requireRole("client"), clientController.getProfile); 
clientRouter.get( "/notifications/:clientId", verifyToken, requireRole("client"), clientController.getAllNotifications );
clientRouter.get("/userProfile/view/:userId", clientController.getUserProfile);
clientRouter.get( "/job/proposals/:clientId", verifyToken, requireRole("client"), clientController.getProposals);
clientRouter.get( "/jobs/all-jobs/:clientId", verifyToken, requireRole("client"), clientController.listAllJobs);
clientRouter.get( "/jobs/my-jobs/:clientId", verifyToken, requireRole("client"), clientController.getMyJobs);
clientRouter.get( "/jobs/latest-jobs/:clientId", verifyToken, requireRole("client"), clientController.latestJobs);
clientRouter.get( "/job/myContracts/:clientId", verifyToken, requireRole("client"), clientController.myContracts);
clientRouter.get( "/contract/:contractId", verifyToken, requireRole("client"), clientController.viewContract);
clientRouter.get( "/contracts/submissions/:clientId", verifyToken, requireRole("client"), clientController.viewSubmissions);
clientRouter.get( "/chat/:memberId", verifyToken, requireRole("client"), clientController.getAllChats);
clientRouter.get( "/chat/view/:chatId", verifyToken, requireRole("client"), clientController.viewChat);
clientRouter.get( "/developers/allDevelopers", verifyToken, requireRole("client"), clientController.getallDevelopers);


clientRouter.post("/signup", clientController.signupClient);
clientRouter.post("/verify-otp", clientController.verifyOtp);
clientRouter.post("/resend-otp", clientController.resendOtp);
clientRouter.post("/login", clientController.loginClient);
clientRouter.post("/verify-email", clientController.verifyEmail);
clientRouter.post("/resetPassword/:clientId", clientController.resetPassword);
clientRouter.post("/googleLogin", clientController.googleLogin);
clientRouter.post("/logout", clientController.logoutClient);
clientRouter.post( "/profile/edit/:clientId", verifyToken, requireRole("client"), clientController.editProfile);  
clientRouter.post( "/profile/verification/:clientId", verifyToken, requireRole("client"), clientController.profileVerification);

//payment and new jobpost creation phase
clientRouter.post(
"/jobPost/payment-stripe/:clientId", clientController.makePayment
);
clientRouter.post("/payment/success/:clientId", clientController.createJobPost);
clientRouter.post("/rate/user/:notificationId", verifyToken, requireRole("client"), clientController.rateUser);

clientRouter.post("/project/submit/approval/:contractId", verifyToken, requireRole("client"), clientController.closeContract);
// clientRouter.post('/job/createContract',verifyToken, requireRole('client'), clientController.createContract);

//chat routes
clientRouter.post("/chat/create-chat", verifyToken, requireRole("client"), clientController.createChat);
clientRouter.post("/chat/sendMessage", verifyToken, requireRole("client"), clientController.sendMessage);

clientRouter.put("/profile/edit/:clientId", verifyToken, requireRole("client"), clientController.editProfile);



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
