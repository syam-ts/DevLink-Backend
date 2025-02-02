import express from 'express';
import jwt from 'jsonwebtoken';
const clientRouter = express.Router();
import { clientController } from '../controllers/clientCtrl'; 
import { ClientModel } from '../../../domain/entities/Client';
import { verifyToken } from '../middlewares/auth/verifyToken';
import { requireRole } from '../middlewares/auth/requireRole';


clientRouter.get('/getHome',verifyToken, requireRole('client'), clientController.getHomeClient);
clientRouter.get('/profile/view/:clientId',verifyToken, requireRole('client'), clientController.getProfile); //AD
clientRouter.get('/notifications/:clientId',verifyToken, requireRole('client'), clientController.getAllNotifications);
clientRouter.get('/userProfile/view/:userId', clientController.getUserProfile);
clientRouter.get('/job/proposals/:clientId',verifyToken, requireRole('client'), clientController.getProposals);
clientRouter.get('/jobs/all-jobs/:clientId',clientController.listAllJobs);
clientRouter.get('/jobs/my-jobs/:clientId', clientController.getMyJobs);
clientRouter.get('/jobs/latest-jobs/:clientId', clientController.latestJobs);
clientRouter.get('/job/myContracts/:clientId', clientController.myContracts);
clientRouter.get('/contract/:contractId', clientController.viewContract);
clientRouter.get('/contracts/submissions/:clientId', clientController.viewSubmissions);
clientRouter.get('/chat/:memberId', clientController.getAllChats);
clientRouter.get('/chat/view/:chatId', clientController.viewChat);
clientRouter.get('/developers/allDevelopers', clientController.getallDevelopers);


 
clientRouter.post('/signup', clientController.signupClient);
clientRouter.post('/verify-otp', clientController.verifyOtp);
clientRouter.post('/resend-otp', clientController.resendOtp);
clientRouter.post('/login', clientController.loginClient);
clientRouter.post('/verify-email',clientController.verifyEmail);
clientRouter.post('/resetPassword/:clientId',clientController.resetPassword);
clientRouter.post('/googleLogin', clientController.googleLogin);
clientRouter.post('/logout', clientController.logoutClient);

clientRouter.post('/profile/edit/:clientId', clientController.editProfile); //AD
clientRouter.post('/profile/verification/:clientId', clientController.profileVerification);

//payment and new jobpost creation phase
clientRouter.post('/jobPost/payment-stripe/:clientId',clientController.makePayment); 
clientRouter.post('/payment/success/:clientId',clientController.createJobPost);
clientRouter.post('/rate/user/:notificationId',clientController.rateUser);


clientRouter.post('/project/submit/approval/:contractId',clientController.closeContract);
// clientRouter.post('/job/createContract',clientController.createContract);

//chat routes
clientRouter.post('/chat/create-chat', clientController.createChat);
clientRouter.post('/chat/sendMessage', clientController.sendMessage);



clientRouter.put('/profile/edit/:clientId', clientController.editProfile);






clientRouter.get('/refresh-token', async (req: any, res: any) => {
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
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      CLIENT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

   
    client.refreshToken = newRefreshToken;
    await client.save();

 
    res.cookie('jwtC', newRefreshToken, { httpOnly: true, secure: true });
    res.json({ accessTokenC: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



export default clientRouter;
