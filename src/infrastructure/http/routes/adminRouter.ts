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
adminRouter.get('/viewRole/:roleId/:roleInfo', adminController.viewRoleInfo);
adminRouter.get('/getWallet', adminController.getWallet);


adminRouter.post('/login', adminController.loginAdmin); 
adminRouter.post('/logout', adminController.logoutAdmin); 


adminRouter.put('/verifyClient/accept',adminController.verifyAccept);

adminRouter.patch('/blockUser/:userId', adminController.blockUser);
adminRouter.patch('/unBlockUser/:userId', adminController.unBlockUser);

adminRouter.patch('/blockClient/:clientId', adminController.blockClient);
adminRouter.patch('/unBlockClient/:clientId', adminController.unBlockClient);

export default adminRouter;