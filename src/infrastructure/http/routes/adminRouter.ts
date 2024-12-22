import express from 'express';
import { adminController } from '../controllers/adminCtrl'
import { userAuth } from '../middlewares/auth/authUser'

const adminRouter = express.Router();

  
adminRouter.post('/login', adminController.loginAdmin); 
adminRouter.post('/logout', adminController.logoutAdmin); 

export default adminRouter;