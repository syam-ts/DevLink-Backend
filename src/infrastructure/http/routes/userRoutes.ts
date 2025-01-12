import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userCtrl'
import { userAuth } from '../middlewares/auth/authUser'; 


import { UserModel } from '../../../domain/entities/User'
import jwt from "jsonwebtoken";


 


userRouter.get('/getHome', userAuth, userController.getHomeUser);
userRouter.get('/profile/view/:userId', userController.getProfile); //ADD USERAUTH
userRouter.get('/listAllJobs',userAuth, userController.listAllJobs);
userRouter.get('/listJobs/bestMatches/:userId', userController.bestMatches);
userRouter.get('/all-contracts/:userId', userController.allContracts);
userRouter.get('/notifications/:userId', userController.allNotifications);


// userRouter.get('/jobs/proposals/:clientId',userController.getAllProposals);
 
 
userRouter.post('/signup', userController.signupUser);
userRouter.post('/verify-otp',userController.verifyOtp);
userRouter.post('/resend-otp', userController.resendOtp);
userRouter.post('/verify-email', userController.verifyEmail); 
userRouter.post('/resetPassword/:userId', userController.resetPassword);
userRouter.post('/login', userController.loginUser);
userRouter.post('/googleLogin', userController.googleLogin);
userRouter.post('/logout', userController.logoutUser);


userRouter.post('/contact/response', userController.closingContract);

userRouter.post('/job/createProposal/:clientId/:userId/:jobPostId', userController.createProposal); // ADD USERAUTH
userRouter.put('/profile/edit/:userId',userController.editProfile); // ADD USERAUTH
 




userRouter.get('/refresh-token', async (req: any, res: any) => {
  try {
    const refreshToken = req.cookies.jwtU;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const USER_REFRESH_TOKEN: any = process.env.USER_REFRESH_TOKEN;
    const USER_ACCESS_TOKEN: any = process.env.USER_ACCESS_TOKEN;

    // Verify the refresh token
    const decoded: any = jwt.verify(refreshToken, USER_REFRESH_TOKEN);

    // Find user in the database
    const user = await UserModel.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      USER_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      USER_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    // Update refresh token in DB
    user.refreshToken = newRefreshToken;
    await user.save();

    // Send new tokens
    res.cookie('jwtU', newRefreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



 

userRouter.get('/auth/validate-token', (req: any, res: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.USER_ACCESS_TOKEN as string);
    return res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
});



export default userRouter;

 