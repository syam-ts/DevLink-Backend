import express from 'express';
const adminRouter = express.Router();
import { adminController } from '../controllers/adminCtrl';
import { verifyToken } from '../middlewares/auth/verifyToken'; 
import refreshToken from '../middlewares/auth/refreshToken';
import { requireRole } from '../middlewares/auth/requireRole';
import {allRoles} from '../../../helper/constants/enums';

const {
    getDashboard,
    getAllUsers,
    getAllClients, 
    viewWallet,
    loginAdmin,
    successMoneyTransfer,
    viewContracts,
    getRequests,
    getRequestedClient,
    viewRoleInfo,
    getWallet,
    logoutAdmin,
    searchUser,
    searchClient,
    sortClient,
    verifyAccept,
    blockUser,
    unBlockUser,
    blockClient,
    unBlockClient,
    getAllContracts,
    viewSingleContract,
    getWithdrawRequests
} = adminController;
const {ADMIN}: {ADMIN: string} = allRoles;

// adminRouter.post('/signup', adminController.signUpAdmin);

adminRouter.get('/getDashboard',verifyToken,requireRole(ADMIN), getDashboard);
// adminRouter.get('/dashboard', getDashboard);
adminRouter.get('/getAllUsers', verifyToken,requireRole(ADMIN), getAllUsers);
adminRouter.get('/getAllClients', verifyToken,requireRole(ADMIN), getAllClients);   
adminRouter.get('/wallet', verifyToken,requireRole(ADMIN), viewWallet);    
adminRouter.patch('/blockUser/:userId', verifyToken,requireRole(ADMIN), blockUser);
adminRouter.patch('/unBlockUser/:userId', verifyToken,requireRole(ADMIN), unBlockUser);
adminRouter.patch('/blockClient/:clientId', verifyToken,requireRole(ADMIN), blockClient);
adminRouter.patch('/unBlockClient/:clientId', verifyToken,requireRole(ADMIN), unBlockClient); 
adminRouter.get('/getRequests', verifyToken,requireRole(ADMIN), getRequests);
adminRouter.get('/getWithdrawRequests', verifyToken,requireRole(ADMIN), getWithdrawRequests);
adminRouter.post('/successMoneyTransfer', verifyToken,requireRole(ADMIN),successMoneyTransfer); 
adminRouter.get('/viewContracts', verifyToken,requireRole(ADMIN), viewContracts);


adminRouter.get('/contract/:contractId', verifyToken,requireRole(ADMIN), viewContracts);
adminRouter.get('/revenue', viewContracts);
adminRouter.get('/userMetrics', viewContracts);
adminRouter.get('/clientMetrics', viewContracts);





adminRouter.get('/request/getRequestedClient/:clientId', getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', viewRoleInfo);
adminRouter.get('/getWallet', getWallet); 
adminRouter.get('/getAllContracts', getAllContracts);  
adminRouter.get('/viewSingleContract/:contractId', viewSingleContract); 
adminRouter.post('/getAllUsers/search?', searchUser);
adminRouter.post('/getAllClients/search?', searchClient);
adminRouter.post('/getAllClients/sort?', sortClient);
adminRouter.put('/verifyClient/accept', verifyAccept);  


adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.post('/refresh-token', refreshToken); 


export default adminRouter;