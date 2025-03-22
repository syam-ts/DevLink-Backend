import express from 'express';
const adminRouter = express.Router();
import { adminController } from '../controllers/adminCtrl';
import { verifyToken } from '../middlewares/auth/verifyToken';
import refreshToken from '../middlewares/auth/refreshToken';
import { requireRole } from '../middlewares/auth/requireRole';
import { allRoles } from '../../../helper/constants/enums';

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
const { ADMIN }: { ADMIN: string } = allRoles;

adminRouter.get('/getDashboard/:range', verifyToken, requireRole(ADMIN), getDashboard);
adminRouter.get('/getAllUsers', verifyToken, requireRole(ADMIN), getAllUsers);
adminRouter.get('/getAllClients', verifyToken, requireRole(ADMIN), getAllClients);
adminRouter.get('/wallet', verifyToken, requireRole(ADMIN), viewWallet);
adminRouter.get('/getRequests', verifyToken, requireRole(ADMIN), getRequests);
adminRouter.get('/getWithdrawRequests', verifyToken, requireRole(ADMIN), getWithdrawRequests);
adminRouter.post('/successMoneyTransfer', verifyToken, requireRole(ADMIN), successMoneyTransfer);
adminRouter.get('/viewContracts', verifyToken, requireRole(ADMIN), viewContracts);
adminRouter.get('/contract/:contractId', verifyToken, requireRole(ADMIN), viewContracts);
adminRouter.get('/revenue', verifyToken, requireRole(ADMIN), viewContracts);
adminRouter.get('/userMetrics', verifyToken, requireRole(ADMIN), viewContracts);
adminRouter.get('/clientMetrics', verifyToken, requireRole(ADMIN), viewContracts);
adminRouter.get('/request/getRequestedClient/:clientId', getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', viewRoleInfo);
adminRouter.get('/getWallet', verifyToken, requireRole(ADMIN), getWallet);
adminRouter.get('/getAllContracts', verifyToken, requireRole(ADMIN), getAllContracts);
adminRouter.get('/viewSingleContract/:contractId', verifyToken, requireRole(ADMIN), viewSingleContract);
// adminRouter.post('/signup', adminController.signUpAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.post('/refresh-token', refreshToken);
adminRouter.post('/getAllUsers/search?', verifyToken, requireRole(ADMIN), searchUser);
adminRouter.post('/getAllClients/search?', verifyToken, requireRole(ADMIN), searchClient);
adminRouter.post('/getAllClients/sort?', verifyToken, requireRole(ADMIN), sortClient);

adminRouter.put('/verifyClient/accept', verifyToken, requireRole(ADMIN), verifyAccept);
adminRouter.patch('/blockUser/:userId', verifyToken, requireRole(ADMIN), blockUser);
adminRouter.patch('/unBlockUser/:userId', verifyToken, requireRole(ADMIN), unBlockUser);
adminRouter.patch('/blockClient/:clientId', verifyToken, requireRole(ADMIN), blockClient);
adminRouter.patch('/unBlockClient/:clientId', verifyToken, requireRole(ADMIN), unBlockClient);

export default adminRouter;