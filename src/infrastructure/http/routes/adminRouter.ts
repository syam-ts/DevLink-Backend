import express from 'express';
const adminRouter = express.Router();
import { adminController } from '../controllers/adminCtrl'; 
import { verifyToken } from '../middlewares/auth/verifyToken';
import { requireRole } from '../middlewares/auth/requireRole'; 


// adminRouter.post('/signup', adminController.signUpAdmin);
  
adminRouter.get('/dashboard', verifyToken, requireRole("admin"), adminController.getDashboard);
adminRouter.get('/getAllUsers', verifyToken, requireRole("admin"), adminController.getAllUsers);
adminRouter.get('/getAllClients', verifyToken, requireRole("admin"), adminController.getAllClients);
adminRouter.get('/getAllUsers', verifyToken, requireRole("admin"), adminController.getAllUsers);
adminRouter.get('/getRequests', verifyToken, requireRole("admin"), adminController.getRequests);
adminRouter.get('/request/getRequestedClient/:clientId', verifyToken, requireRole("admin"), adminController.getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', verifyToken, requireRole("admin"), adminController.viewRoleInfo);
adminRouter.get('/getWallet', verifyToken, requireRole("admin"), adminController.getWallet);
adminRouter.get('/logout', adminController.logoutAdmin); 


adminRouter.post('/login', adminController.loginAdmin); 
adminRouter.post('/logout', adminController.logoutAdmin); 
adminRouter.post('/getAllUsers/search?', verifyToken, requireRole("admin"), adminController.searchUser);  
adminRouter.post('/getAllClients/search?', verifyToken, requireRole("admin"), adminController.searchClient); 
adminRouter.post('/getAllClients/sort?', verifyToken, requireRole("admin"), adminController.sortClient); 

adminRouter.put('/verifyClient/accept', verifyToken, requireRole("admin"), adminController.verifyAccept);

adminRouter.patch('/blockUser/:userId',  verifyToken, requireRole("admin"), adminController.blockUser);
adminRouter.patch('/unBlockUser/:userId',  verifyToken, requireRole("admin"), adminController.unBlockUser);
adminRouter.patch('/blockClient/:clientId',  verifyToken, requireRole("admin"), adminController.blockClient);
adminRouter.patch('/unBlockClient/:clientId',  verifyToken, requireRole("admin"), adminController.unBlockClient);

 


export default adminRouter;