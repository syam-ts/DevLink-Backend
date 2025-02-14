import express from 'express';
const userRouter = express.Router();
import { userController } from '../controllers/userCtrl'
import { verifyToken } from '../middlewares/auth/verifyToken';
import { clientController } from '../controllers/clientCtrl';
import refreshToken from '../middlewares/auth/refreshToken';
import { requireRole } from '../middlewares/auth/requireRole';


const {
    allClients,
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
    addUserToWishlist,
    submitProject,
    boostAccount,
    chatbot,
    createProposal,
    editProfile,
    bosstSuccess,
} = userController;



userRouter.get('/alluser', allClients)

userRouter.get('/getHome', verifyToken, requireRole('user'), getHomeUser);
userRouter.get('/profile/view/:userId', getProfile);
userRouter.get('/home/:type', verifyToken, requireRole('user'), listHomeJobs);
userRouter.get('/jobs/view/:jobType/:userId', verifyToken, requireRole('user'), getSelectedJobs);
userRouter.get('/all-contracts/:userId', verifyToken, requireRole('user'), allContracts);
userRouter.get('/notifications/:userId', verifyToken, allNotifications);
userRouter.get('/job/view/:jobPostId', verifyToken, requireRole('user'), getSingleJobPost);
userRouter.get('/job/myContracts/:userId', verifyToken, requireRole('user'), viewMyContracts);
userRouter.get('/job/submittedContracts/:userId', verifyToken, requireRole('user'), viewSubmittedContracts);
userRouter.get('/chat/:memberId', verifyToken, requireRole('user'), clientController.getAllChats);
userRouter.get('/job/proposals/:userId', getAllProposals);
userRouter.get("/wallet/:userId/view", viewWalletUser);

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


//chat
userRouter.post('/chat/sendMessage', verifyToken, requireRole('user'), clientController.sendMessage);
userRouter.post('/wishlist/add', verifyToken, requireRole('user'), addUserToWishlist);
userRouter.post('/project/submit/:contractId', submitProject)
// userRouter.post('/contact/response', closingContract);
userRouter.post('/account/boost/:userId', verifyToken, requireRole('user'), boostAccount);
userRouter.post('/chatbot', verifyToken, requireRole('user'), chatbot);
userRouter.post('/job/createProposal', verifyToken, requireRole('user'), createProposal)


// userRouter.post('/job/createProposal/:clientId/:userId/:jobPostId', verifyToken,  createProposal);  
userRouter.put('/profile/:type/:userId', verifyToken, requireRole('user'), editProfile);
userRouter.patch('/profile/boost/success/:userId', verifyToken, requireRole('user'), bosstSuccess); // ADD USERAUTH

userRouter.post('/refresh-token', refreshToken);


export default userRouter;

