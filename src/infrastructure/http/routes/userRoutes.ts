import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userCtrl'
import { verifyToken } from '../middlewares/auth/verifyToken';
import { clientController } from '../controllers/clientCtrl';
import refreshToken from '../middlewares/auth/refreshToken';
import { requireRole } from '../middlewares/auth/requireRole';



userRouter.get('/alluser', userController.allClients)

userRouter.get('/getHome', verifyToken, requireRole('user'), userController.getHomeUser);
userRouter.get('/profile/view/:userId', verifyToken, requireRole('user'), userController.getProfile);
userRouter.get('/home/:type', verifyToken, requireRole('user'), userController.listHomeJobs);
userRouter.get('/job/:jobType/:userId', verifyToken, requireRole('user'), userController.getSelectedJobs);
userRouter.get('/all-contracts/:userId', verifyToken, requireRole('user'), userController.allContracts);
userRouter.get('/notifications/:userId', verifyToken, userController.allNotifications);
userRouter.get('/job/:jobPostId', verifyToken, requireRole('user'), userController.getSingleJobPost);
userRouter.get('/job/myContracts/:userId', verifyToken, requireRole('user'), userController.viewMyContracts);
userRouter.get('/job/submittedContracts/:userId', verifyToken, requireRole('user'), userController.viewSubmittedContracts);
userRouter.get('/chat/:memberId', verifyToken, requireRole('user'), clientController.getAllChats);
userRouter.get('/job/proposals/:userId', verifyToken, requireRole('user'), userController.getAllProposals);

userRouter.get('/chat/view/:roleId/:targetId',  clientController.viewChat);


userRouter.post('/signup', userController.signupUser);
userRouter.post('/verify-otp', userController.verifyOtp);
userRouter.post('/resend-otp', userController.resendOtp);
userRouter.post('/verify-email', userController.verifyEmail);
userRouter.post('/resetPassword/:userId', userController.resetPassword);
userRouter.post('/login', userController.loginUser);
userRouter.post('/googleLogin', userController.googleLogin);
userRouter.post('/logout', userController.logoutUser);


//chat
userRouter.post('/chat/sendMessage', verifyToken, requireRole('user'), clientController.sendMessage);
userRouter.post('/wishlist/add', verifyToken, requireRole('user'), userController.addUserToWishlist);
userRouter.post('/project/submit/:contractId', verifyToken, requireRole('user'), userController.submitProject)
// userRouter.post('/contact/response', userController.closingContract);
userRouter.post('/account/boost/:userId', verifyToken, requireRole('user'), userController.boostAccount);
userRouter.post('/chatbot', verifyToken, requireRole('user'), userController.chatbot);
userRouter.post('/job/createProposal', verifyToken, requireRole('user'), userController.createProposal)


// userRouter.post('/job/createProposal/:clientId/:userId/:jobPostId', verifyToken,  userController.createProposal);  
userRouter.put('/profile/:type/:userId', verifyToken, requireRole('user'), userController.editProfile);
userRouter.patch('/profile/boost/success/:userId', verifyToken, requireRole('user'), userController.bosstSuccess); // ADD USERAUTH

userRouter.post('/refresh-token', refreshToken);


export default userRouter;

