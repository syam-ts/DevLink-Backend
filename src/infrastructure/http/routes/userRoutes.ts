import express from 'express';
import { userController } from '../controllers/userCtrl'

const userRouter = express.Router();

 
userRouter.post('/signup', userController.signupUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/googleLogin', userController.googleLogin);

export default userRouter;