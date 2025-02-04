import express from 'express';
const adminRouter = express.Router();
import { adminController } from '../controllers/adminCtrl'; 
import { verifyToken } from '../middlewares/auth/verifyToken';
import { requireRole } from '../middlewares/auth/requireRole';
// import { requireRole } from '../middlewares/auth/requireRole'; 


// adminRouter.post('/signup', adminController.signUpAdmin);
  
adminRouter.get('/dashboard', verifyToken,requireRole('admin'), adminController.getDashboard);
adminRouter.get('/getAllUsers', verifyToken,requireRole('admin'), adminController.getAllUsers);
adminRouter.get('/getAllClients', verifyToken, requireRole('admin'), adminController.getAllClients);
adminRouter.get('/getAllUsers', verifyToken, adminController.getAllUsers);
adminRouter.get('/getRequests', verifyToken, adminController.getRequests);
adminRouter.get('/request/getRequestedClient/:clientId', verifyToken, adminController.getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', verifyToken, adminController.viewRoleInfo);
adminRouter.get('/getWallet', verifyToken, adminController.getWallet);
adminRouter.get('/logout', adminController.logoutAdmin); 


adminRouter.post('/login', adminController.loginAdmin); 
adminRouter.post('/logout', adminController.logoutAdmin); 
adminRouter.post('/getAllUsers/search?', verifyToken, adminController.searchUser);  
adminRouter.post('/getAllClients/search?', verifyToken, adminController.searchClient); 
adminRouter.post('/getAllClients/sort?', verifyToken, adminController.sortClient); 

adminRouter.put('/verifyClient/accept', verifyToken, adminController.verifyAccept);

adminRouter.patch('/blockUser/:userId',  verifyToken, adminController.blockUser);
adminRouter.patch('/unBlockUser/:userId',  verifyToken, adminController.unBlockUser);
adminRouter.patch('/blockClient/:clientId',  verifyToken, adminController.blockClient);
adminRouter.patch('/unBlockClient/:clientId',  verifyToken, adminController.unBlockClient);

 


export default adminRouter;