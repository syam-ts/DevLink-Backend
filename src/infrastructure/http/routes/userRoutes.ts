import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userCtrl'
import { userAuth } from '../middlewares/auth/authUser'; 


import { UserModel } from '../../../domain/entities/User'
import jwt from "jsonwebtoken";
import { AnyKeys } from 'mongoose';


 


userRouter.get('/getHome', userAuth, userController.getHomeUser);
userRouter.get('/profile/view/:userId', userController.getProfile); //ADD USERAUTH
userRouter.get('/listAllJobs/:userId', userAuth, userController.listAllJobs);
userRouter.get('/bestMatches/:userId', userController.bestMatches);
userRouter.get('/all-contracts/:userId', userController.allContracts); 
userRouter.get('/notifications/:userId', userAuth, userController.allNotifications);
userRouter.get('/job/:jobPostId', userController.getSingleJobPost);
userRouter.get('/job/myContracts/:userId', userController.viewMyContracts);
userRouter.get('/job/submittedContracts/:userId', userController.viewSubmittedContracts);
 


// userRouter.get('/jobs/proposals/:clientId',userController.getAllProposals);
 
 
userRouter.post('/signup', userController.signupUser);
userRouter.post('/verify-otp',userController.verifyOtp);
userRouter.post('/resend-otp', userController.resendOtp);
userRouter.post('/verify-email', userController.verifyEmail); 
userRouter.post('/resetPassword/:userId', userController.resetPassword);
userRouter.post('/login', userController.loginUser);
userRouter.post('/googleLogin', userController.googleLogin);
userRouter.post('/logout', userController.logoutUser);

userRouter.post('/project/submit/:contractId', userController.submitProject)

// userRouter.post('/contact/response', userController.closingContract);

userRouter.post('/account/boost/:userId', userController.boostAccount);


userRouter.post('/chatbot', userController.chatbot);


userRouter.post('/job/createProposal', userController.createProposal )

// userRouter.post('/job/createProposal/:clientId/:userId/:jobPostId', userController.createProposal); // ADD USERAUTH
userRouter.put('/profile/edit/:userId',userController.editProfile); // ADD USERAUTH
userRouter.patch('/profile/boost/success/:userId',userController.bosstSuccess); // ADD USERAUTH
 

userRouter.get('/refresh', (req: any, res: any, next: any) => { 
  
 
  try {
 
    const refreshToken = req.cookies.refreshU;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
 
    const USER_REFRESH_TOKEN: string = process.env.USER_REFRESH_TOKEN as string;
    const USER_ACCESS_TOKEN: string = process.env.USER_ACCESS_TOKEN as string;

 
    jwt.verify(refreshToken, USER_REFRESH_TOKEN, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
      }

      
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        USER_ACCESS_TOKEN,
        { expiresIn: "15m" }
      );

      // Optionally set the new access token in cookies (if desired)
      res.cookie("accessTokenU", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Send the new access token in the response
      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Error in refreshAccessToken:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } 
})

 

  



export default userRouter;

 