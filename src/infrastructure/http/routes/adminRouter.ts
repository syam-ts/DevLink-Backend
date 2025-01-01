import express from 'express';
const adminRouter = express.Router();
import { adminController } from '../controllers/adminCtrl'
import { adminAuth } from '../middlewares/auth/authAdmin'


// adminRouter.post('/signup', adminController.signUpAdmin);
  
adminRouter.get('/dashboard',adminAuth, adminController.getDashboard);
adminRouter.get('/getAllUsers', adminController.getAllUsers);
adminRouter.get('/getAllClients', adminController.getAllClients);
adminRouter.get('/getRequests', adminController.getRequests);
adminRouter.get('/request/getRequestedClient/:clientId', adminController.getRequestedClient);


adminRouter.post('/login', adminController.loginAdmin); 
adminRouter.post('/logout', adminController.logoutAdmin); 


adminRouter.put('/verifyClient/accept',adminController.verifyAccept);

adminRouter.patch('/blockUser/:userId', adminController.blockUser);
adminRouter.patch('/unBlockUser/:userId', adminController.unBlockUser);

export default adminRouter;