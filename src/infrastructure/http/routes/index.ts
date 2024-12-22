import express from 'express';
import userRouter from './userRoutes';
import clientRouter from './clientRoutes';
import adminRouter from './adminRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/admin',adminRouter);

export default router;