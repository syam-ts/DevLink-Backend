import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userCtrl'
import { verifyToken } from '../middlewares/auth/verifyToken';
import { clientController } from '../controllers/clientCtrl';
import refreshToken from '../middlewares/auth/refreshToken';
import { requireRole } from '../middlewares/auth/requireRole';
import {allRoles} from '../../../helper/constants/enums';
 
const { 
    signupUser,
    verifyOtp,
    resendOtp,
    verifyEmail,
    resetPassword,
    loginUser,
    googleLogin,
    logoutUser,
    getHomeUser,
    listHomeJobs,
    getSelectedJobs, 
    viewProposals, 
    viewContracts, 
    getProfile,
    alterProfile,
    boostAccount,
    bosstSuccess,
    viewAllWishlist,
    addToWishlist,
    removeFromWishlist, 
    viewWalletUser,
    getSingleJobPost, 
    createProposal,
    viewSingleContract,  
    withdrawMoneyByUser,
    
    searchJobs,
    submitProject,
    getAllInvites,
    rejectInvite,
    chatbot,
    allNotifications,
} = userController;
const { USER }: {USER: string} = allRoles;


userRouter.get('/getHome', getHomeUser);
userRouter.get('/home/:type', listHomeJobs);
userRouter.get('/jobs/:jobsType', verifyToken, requireRole(USER), getSelectedJobs);
userRouter.get('/proposals/:proposalType',verifyToken, requireRole(USER), viewProposals);
userRouter.get('/contracts/:contractViewType', verifyToken, requireRole(USER), viewContracts); 
userRouter.get('/profile/:type',verifyToken, requireRole(USER), getProfile); 
userRouter.put('/profileAlter/:type', verifyToken, requireRole(USER), alterProfile);
userRouter.post('/boostProfile', verifyToken, requireRole(USER), boostAccount);
userRouter.patch('/profileBoostSuccess', verifyToken, requireRole(USER), bosstSuccess);  
userRouter.get('/wishlist', verifyToken, requireRole(USER), viewAllWishlist);
userRouter.post('/addToWishlist', verifyToken, requireRole(USER), addToWishlist);

userRouter.patch('/removeFromWishlist/:wishlistId',verifyToken, requireRole(USER), removeFromWishlist); 


userRouter.get("/wallet",verifyToken, requireRole(USER), viewWalletUser);
userRouter.post('/createProposal', verifyToken, requireRole(USER), createProposal);
userRouter.get("/invites",verifyToken, requireRole(USER), getAllInvites);  
userRouter.post('/withdrawMoney',verifyToken, requireRole(USER), withdrawMoneyByUser);  
userRouter.post('/searchJobs',verifyToken, requireRole(USER), searchJobs);
userRouter.get('/job/:jobPostId',verifyToken, requireRole(USER), getSingleJobPost);
userRouter.get("/contract/:contractId",verifyToken, requireRole(USER),viewSingleContract);
userRouter.get('/notifications/:userId', verifyToken, requireRole(USER), allNotifications);
userRouter.get('/allChat/view/:roleId', clientController.getAllChats);
userRouter.get('/chat/:memberId', verifyToken, requireRole(USER), clientController.getAllChats);
userRouter.get("/chat/view/:roleType/:roleId/:targetId", clientController.viewChat);
userRouter.post('/signup', signupUser);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/resend-otp', resendOtp);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/resetPassword/:userId', resetPassword);
userRouter.post('/login', loginUser);
userRouter.post('/googleLogin', googleLogin);
userRouter.post('/logout', logoutUser);

// -------Pendings----------
userRouter.post('/project/submit/:contractId',verifyToken, requireRole(USER), submitProject);
userRouter.post('/chat/sendMessage', verifyToken, requireRole(USER), clientController.sendMessage);
userRouter.post('/chatbot', verifyToken, requireRole(USER), chatbot);
userRouter.post('/invite-reject/:inviteId', verifyToken, requireRole(USER), rejectInvite); 
userRouter.post('/refresh-token', refreshToken);


export default userRouter;

