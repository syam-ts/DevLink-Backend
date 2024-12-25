import express from 'express';
import { clientController } from '../controllers/clientCtrl'
import { clientAuth } from '../middlewares/auth/authClient'

const clientRouter = express.Router();

clientRouter.get('/getHome', clientAuth, clientController.getHomeClient);
clientRouter.get('/profile/view/:clientId', clientController.getProfile);
 
clientRouter.post('/signup', clientController.signupClient);
clientRouter.post('/verify-otp', clientController.verifyOtp);
clientRouter.post('/resend-otp', clientController.resendOtp);
clientRouter.post('/login', clientController.loginClient);
clientRouter.post('/verify-email',clientController.verifyEmail);
clientRouter.post('/resetPassword/:clientId',clientController.resetPassword);
clientRouter.post('/googleLogin', clientController.googleLogin);
clientRouter.post('/logout', clientAuth, clientController.logoutClient);

clientRouter.put('/profile/edit/clientId', clientController.editProfile);

export default clientRouter;