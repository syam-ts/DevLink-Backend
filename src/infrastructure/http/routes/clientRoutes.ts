import express from 'express';
import { ClientController } from '../controllers/clientCtrl'

const clientRouter = express.Router();

 
clientRouter.post('/signup', ClientController.signupClient);
clientRouter.post('/login', ClientController.loginClient);
clientRouter.post('/googleLogin', ClientController.googleLogin);
clientRouter.post('/logout', ClientController.logoutUser);

export default clientRouter;