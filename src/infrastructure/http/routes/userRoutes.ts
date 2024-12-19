import express from 'express';
import { userController } from '../controllers/userCtrl'
import { userAuth } from '../middlewares/user/authUser'

const userRouter = express.Router();

 
userRouter.post('/signup', userController.signupUser);
userRouter.post('/verify-otp', userController.verifyOtp);
userRouter.post('/login', userController.loginUser);
userRouter.post('/googleLogin', userController.googleLogin);
userRouter.get('/getHome',userAuth, userController.getHomeUser);
userRouter.post('/logout', userController.logoutUser);

export default userRouter;