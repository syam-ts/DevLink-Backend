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
} = adminController;


// adminRouter.post('/signup', adminController.signUpAdmin);

adminRouter.get('/dashboard', getDashboard);
adminRouter.get('/getAllUsers', getAllUsers);
adminRouter.get('/getAllClients', getAllClients); 
adminRouter.get('/getRequests', getRequests);
adminRouter.get('/request/getRequestedClient/:clientId', verifyToken, getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', verifyToken, viewRoleInfo);
adminRouter.get('/getWallet', verifyToken, getWallet); 


adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.post('/getAllUsers/search?', verifyToken, searchUser);
adminRouter.post('/getAllClients/search?', verifyToken, searchClient);
adminRouter.post('/getAllClients/sort?', verifyToken, sortClient);

adminRouter.put('/verifyClient/accept', verifyAccept);

adminRouter.patch('/blockUser/:userId', verifyToken, blockUser);
adminRouter.patch('/unBlockUser/:userId', verifyToken, unBlockUser);
adminRouter.patch('/blockClient/:clientId', verifyToken, blockClient);
adminRouter.patch('/unBlockClient/:clientId', verifyToken, unBlockClient);




export default adminRouter;