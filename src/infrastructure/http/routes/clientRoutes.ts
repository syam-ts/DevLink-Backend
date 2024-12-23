import express from 'express';
import { clientController } from '../controllers/clientCtrl'
import { clientAuth } from '../middlewares/auth/authClient'

const clientRouter = express.Router();

 
clientRouter.post('/signup', clientController.signupClient);
clientRouter.post('/verify-otp', clientController.verifyOtp);
clientRouter.post('/resend-otp', clientController.resendOtp);
clientRouter.post('/login', clientController.loginClient);
clientRouter.post('/verify-email',clientController.verifyEmail);
//user patch
clientRouter.post('/resetPassword/:clientId',clientController.resetPassword);
clientRouter.post('/googleLogin', clientController.googleLogin);
clientRouter.get('/getHome', clientAuth, clientController.getHomeClient);
clientRouter.post('/logout', clientAuth, clientController.logoutClient);

export default clientRouter;