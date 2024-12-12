import express from 'express';
import { userController } from '../controllers/userCtrl'

const userRouter = express.Router();

userRouter.get('/home', userController.getHome);
userRouter.post('/signup', userController.signupUser);

export default userRouter;