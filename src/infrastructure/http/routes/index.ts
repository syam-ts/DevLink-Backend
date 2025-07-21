import express from 'express'; 
import UserRoute from './userRoutes';
import ClientRoute from './clientRoutes';
import AdminRoute from './adminRouter';

const router = express.Router();
 

const userRoute = new UserRoute();
const clientRoute = new ClientRoute();
const adminRoute = new AdminRoute();

router.use('/user', userRoute.router);
router.use('/client', clientRoute.router);
router.use('/admin', adminRoute.router);

export default router;