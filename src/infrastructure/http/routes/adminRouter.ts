import express from 'express';
const adminRouter = express.Router();
import { adminController } from '../controllers/adminCtrl';
import { verifyToken } from '../middlewares/auth/verifyToken';
import { requireRole } from '../middlewares/auth/requireRole';
// import { requireRole } from '../middlewares/auth/requireRole'; 

const {
    getDashboard,
    getAllUsers,
    getAllClients,
    getRequests,
    getRequestedClient,
    viewRoleInfo,
    getWallet,
    logoutAdmin,
    loginAdmin,
    searchUser,
    searchClient,
    sortClient,
    verifyAccept,
    blockUser,
    unBlockUser,
    blockClient,
    unBlockClient,
    getAllContracts
} = adminController;


// adminRouter.post('/signup', adminController.signUpAdmin);

adminRouter.get('/dashboard', getDashboard);
adminRouter.get('/getAllUsers', getAllUsers);
adminRouter.get('/getAllClients', getAllClients); 
adminRouter.get('/getRequests', getRequests);
adminRouter.get('/request/getRequestedClient/:clientId', getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', viewRoleInfo);
adminRouter.get('/getWallet', getWallet); 
adminRouter.get('/getAllContracts', getAllContracts); 


adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.post('/getAllUsers/search?', searchUser);
adminRouter.post('/getAllClients/search?', searchClient);
adminRouter.post('/getAllClients/sort?', sortClient);

adminRouter.put('/verifyClient/accept', verifyAccept);

adminRouter.patch('/blockUser/:userId', blockUser);
adminRouter.patch('/unBlockUser/:userId', unBlockUser);
adminRouter.patch('/blockClient/:clientId', blockClient);
adminRouter.patch('/unBlockClient/:clientId', unBlockClient);




export default adminRouter;