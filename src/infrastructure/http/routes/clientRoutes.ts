import express from 'express';
import { clientController } from '../controllers/clientCtrl'
import { clientAuth } from '../middlewares/auth/authClient'

const clientRouter = express.Router();

 
clientRouter.post('/signup', clientController.signupClient);
clientRouter.post('/verify-otp', clientController.verifyOtp);
clientRouter.post('/login', clientController.loginClient);
clientRouter.post('/googleLogin', clientController.googleLogin);
clientRouter.get('/getHome', clientAuth, clientController.getHomeClient);
clientRouter.post('/logout', clientAuth, clientController.logoutClient);

export default clientRouter;