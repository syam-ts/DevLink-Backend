import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userCtrl' 
import { verifyToken } from '../middlewares/auth/verifyToken';
import { requireRole } from '../middlewares/auth/requireRole';
 
import jwt from "jsonwebtoken"; 
import { clientController } from '../controllers/clientCtrl';
import generateTokens from '../../../utils/generateTokens';





userRouter.get('/getHome', verifyToken, requireRole('user'), userController.getHomeUser);
userRouter.get('/profile/view/:userId', verifyToken, requireRole('user'), userController.getProfile);  
userRouter.get('/home/:type', verifyToken, requireRole('user'), userController.listHomeJobs); 
userRouter.get('/:jobType/:userId', verifyToken, requireRole('user'), userController.getSelectedJobs);
userRouter.get('/all-contracts/:userId', userController.allContracts); 
userRouter.get('/notifications/:userId', userController.allNotifications);
userRouter.get('/job/:jobPostId', userController.getSingleJobPost);
userRouter.get('/job/myContracts/:userId', userController.viewMyContracts);
userRouter.get('/job/submittedContracts/:userId', userController.viewSubmittedContracts);
userRouter.get('/chat/:memberId', clientController.getAllChats);
userRouter.get('/chat/view/:chatId', clientController.viewChat);
userRouter.get('/job/proposals/:userId',verifyToken, requireRole('user'),userController.getAllProposals);
 
 
userRouter.post('/signup', userController.signupUser);
userRouter.post('/verify-otp',userController.verifyOtp);
userRouter.post('/resend-otp', userController.resendOtp);
userRouter.post('/verify-email', userController.verifyEmail); 
userRouter.post('/resetPassword/:userId', userController.resetPassword);
userRouter.post('/login', userController.loginUser);
userRouter.post('/googleLogin', userController.googleLogin);
userRouter.post('/logout', userController.logoutUser);



//chat
userRouter.post('/chat/sendMessage', clientController.sendMessage);

userRouter.post('/wishlist/add', userController.addUserToWishlist);

userRouter.post('/project/submit/:contractId', userController.submitProject)

// userRouter.post('/contact/response', userController.closingContract);

userRouter.post('/account/boost/:userId', userController.boostAccount);


userRouter.post('/chatbot', userController.chatbot);


userRouter.post('/job/createProposal', userController.createProposal )

// userRouter.post('/job/createProposal/:clientId/:userId/:jobPostId', userController.createProposal);  
userRouter.put('/profile/:type/:userId', userController.editProfile);  


userRouter.patch('/profile/boost/success/:userId',userController.bosstSuccess); // ADD USERAUTH
  


userRouter.post('/refresh-token', (req: any, res: any) => {
  const refreshToken = req.cookies.refreshToken;
  console.log('ENTERED HERE FOR RETRY AND REFRES TKN : ', refreshToken)

  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired refresh token' });

      const { accessToken } = generateTokens(decoded);
      res.json({ accessToken });
  });
});



export default userRouter;

 