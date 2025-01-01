import express from 'express';
const clientRouter = express.Router();
import { clientController } from '../controllers/clientCtrl';
import { clientAuth } from '../middlewares/auth/authClient';


clientRouter.get('/getHome', clientAuth, clientController.getHomeClient);
clientRouter.get('/profile/view/:clientId', clientController.getProfile);
clientRouter.get('/profile/notifications/:clientId', clientController.getAllNotifications);
clientRouter.get('/listAllJobs',clientController.listAllJobs);
clientRouter.get('/userProfile/view/:userId', clientController.getUserProfile);
 
clientRouter.post('/signup', clientController.signupClient);
clientRouter.post('/verify-otp', clientController.verifyOtp);
clientRouter.post('/resend-otp', clientController.resendOtp);
clientRouter.post('/login', clientController.loginClient);
clientRouter.post('/verify-email',clientController.verifyEmail);
clientRouter.post('/resetPassword/:clientId',clientController.resetPassword);
clientRouter.post('/googleLogin', clientController.googleLogin);
clientRouter.post('/logout', clientAuth, clientController.logoutClient);

clientRouter.post('/profile/edit/:clientId', clientController.editProfile);
clientRouter.post('/profile/verification/:clientId', clientController.profileVerification);
clientRouter.post('/jobPost/payment-stripe', clientController.makePayment)
clientRouter.post('/createJobPost', clientController.createJobPost);


clientRouter.put('/profile/edit/:clientId', clientController.editProfile);


export default clientRouter;
