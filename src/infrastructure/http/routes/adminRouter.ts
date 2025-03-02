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
    viewWallet,

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
    getAllContracts,
    viewSingleContract
} = adminController;


// adminRouter.post('/signup', adminController.signUpAdmin);

adminRouter.get('/dashboard', getDashboard);
adminRouter.get('/getAllUsers', getAllUsers);
adminRouter.get('/getAllClients', getAllClients);   
adminRouter.get('/wallet', viewWallet);   



adminRouter.patch('/blockClient/:clientId', blockClient);
adminRouter.patch('/unBlockClient/:clientId', unBlockClient); 
adminRouter.patch('/blockUser/:userId', blockUser);
adminRouter.patch('/unBlockUser/:userId', unBlockUser);

adminRouter.get('/getRequests', getRequests);
adminRouter.get('/request/getRequestedClient/:clientId', getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', viewRoleInfo);
adminRouter.get('/getWallet', getWallet); 
adminRouter.get('/getAllContracts', getAllContracts); 

adminRouter.get('/viewSingleContract/:contractId', viewSingleContract); 


adminRouter.post('/login', loginAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.post('/getAllUsers/search?', searchUser);
adminRouter.post('/getAllClients/search?', searchClient);
adminRouter.post('/getAllClients/sort?', sortClient);

adminRouter.put('/verifyClient/accept', verifyAccept);





export default adminRouter;