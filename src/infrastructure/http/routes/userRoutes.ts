import express from 'express';
import { userController } from '../controllers/userCtrl'
import { userAuth } from '../middlewares/auth/authUser'

const userRouter = express.Router();

 
userRouter.post('/signup', userController.signupUser);
userRouter.post('/verify-otp', userController.verifyOtp);
userRouter.post('/resend-otp', userController.resendOtp);
userRouter.post('/verify-email', userController.verifyEmail);
userRouter.post('/resetPassword/:userId', userController.resetPassword);
userRouter.post('/login', userController.loginUser);
userRouter.post('/googleLogin', userController.googleLogin);
userRouter.get('/getHome', userAuth, userController.getHomeUser);
userRouter.post('/logout', userAuth, userController.logoutUser);

export default userRouter;