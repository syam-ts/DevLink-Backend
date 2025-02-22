import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userCtrl'
import { verifyToken } from '../middlewares/auth/verifyToken';
import { clientController } from '../controllers/clientCtrl';
import refreshToken from '../middlewares/auth/refreshToken';
import { requireRole } from '../middlewares/auth/requireRole';
import allRoles from '../../../helper/constants/role';
 
const { 
    getHomeUser,
    getProfile,
    listHomeJobs,
    getSelectedJobs,
    allContracts,
    allNotifications,
    getSingleJobPost,
    viewMyContracts,
    viewSubmittedContracts,
    getAllProposals,
    viewWalletUser,
    signupUser,
    verifyOtp,
    resendOtp,
    verifyEmail,
    resetPassword,
    loginUser,
    googleLogin,
    logoutUser,
    addToWishlist,
    submitProject,
    boostAccount,
    chatbot,
    createProposal,
    editProfile,
    bosstSuccess,
    getAllInvites,
    rejectInvite,
    viewSingleContract,
    withdrawMoneyByUser,
} = userController;
const { USER }: {USER: string} = allRoles;
 
 
userRouter.get('/getHome', verifyToken, requireRole(USER), getHomeUser);
userRouter.get('/home/:type', verifyToken, requireRole(USER), listHomeJobs);
userRouter.get('/profile/view/:userId',verifyToken, requireRole(USER), getProfile);
userRouter.get('/jobs/view/:jobType/:userId', verifyToken, requireRole(USER), getSelectedJobs);
userRouter.get('/job-view/:jobPostId',verifyToken, requireRole(USER), getSingleJobPost);
userRouter.get('/job/submittedContracts/:userId', verifyToken, requireRole(USER), viewSubmittedContracts);
userRouter.get('/job/proposals/:userId',verifyToken, requireRole(USER), getAllProposals);
userRouter.get('/all-contracts/:userId', verifyToken, requireRole(USER), allContracts);
userRouter.get('/contract/myContracts/:userId', verifyToken, requireRole(USER), viewMyContracts);
userRouter.get("/contract/:contractId",verifyToken, requireRole(USER),verifyToken, requireRole(USER), viewSingleContract);
userRouter.get("/wallet-view/:userId",verifyToken, requireRole(USER), viewWalletUser);
userRouter.get("/invites/view/:userId",verifyToken, requireRole(USER), getAllInvites);
userRouter.get('/notifications/:userId', verifyToken, requireRole(USER), allNotifications);
userRouter.get('/chat/:memberId', verifyToken, requireRole(USER), clientController.getAllChats);
 

userRouter.get('/allChat/view/:roleId', clientController.getAllChats);
userRouter.get("/chat/view/:roleType/:roleId/:targetId", clientController.viewChat);

userRouter.post('/signup', signupUser);
userRouter.post('/verify-otp', verifyOtp);
userRouter.post('/resend-otp', resendOtp);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/resetPassword/:userId', resetPassword);
userRouter.post('/login', loginUser);
userRouter.post('/googleLogin', googleLogin);
userRouter.post('/logout', logoutUser);


//chat -----
userRouter.post('/chat/sendMessage', verifyToken, requireRole(USER), clientController.sendMessage);
userRouter.post('/project/submit/:contractId',verifyToken, requireRole(USER), submitProject);
userRouter.post('/account/boost/:userId', verifyToken, requireRole(USER), boostAccount);
userRouter.post('/chatbot', verifyToken, requireRole(USER), chatbot);
userRouter.post('/job/createProposal', verifyToken, requireRole(USER), createProposal);
userRouter.post('/invite/reject/:inviteId', verifyToken, requireRole(USER), rejectInvite);  
userRouter.post('/wallet/withdraw',verifyToken, requireRole(USER), withdrawMoneyByUser); 
userRouter.post('/addToWishlist', addToWishlist);


// userRouter.post('/job/createProposal/:clientId/:userId/:jobPostId', verifyToken,  createProposal);  
userRouter.put('/profile/:type/:userId', verifyToken, requireRole(USER), editProfile);
userRouter.patch('/profile/boost/success/:userId', verifyToken, requireRole(USER), bosstSuccess); // ADD USERAUTH

userRouter.post('/refresh-token', refreshToken);


export default userRouter;

