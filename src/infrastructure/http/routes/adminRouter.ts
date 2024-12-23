import express from 'express';
import { adminController } from '../controllers/adminCtrl'
import { adminAuth } from '../middlewares/auth/authAdmin'

const adminRouter = express.Router();

  
adminRouter.post('/login', adminController.loginAdmin); 
adminRouter.get('/dashboard',adminAuth, adminController.getDashboard);
adminRouter.post('/logout', adminController.logoutAdmin); 
adminRouter.get('/getAllUsers', adminController.getAllUsers);
adminRouter.get('/getAllClients', adminController.getAllClients);
adminRouter.patch('/blockUser/:userId', adminController.blockUser);
adminRouter.patch('/unBlockUser/:userId', adminController.unBlockUser);

export default adminRouter;