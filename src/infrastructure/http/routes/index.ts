import express from 'express';
import userRouter from './userRoutes';
import clientRouter from './clientRoutes';

const router = express.Router();

router.use('/user', userRouter);
router.use('/client', clientRouter);

export default router;