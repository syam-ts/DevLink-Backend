import express from 'express';
const adminRouter = express.Router();
import { adminController } from '../controllers/adminCtrl'
import { adminAuth } from '../middlewares/auth/authAdmin'

import { AdminModel } from '../../../domain/entities/Admin'
import jwt from "jsonwebtoken";


// adminRouter.post('/signup', adminController.signUpAdmin);
  
adminRouter.get('/dashboard',adminAuth, adminController.getDashboard);


adminRouter.get('/getAllUsers', adminController.getAllUsers);


adminRouter.get('/getRequests', adminController.getRequests);
adminRouter.get('/request/getRequestedClient/:clientId', adminController.getRequestedClient);
adminRouter.get('/viewRole/:roleId/:roleInfo', adminController.viewRoleInfo);
adminRouter.get('/getWallet', adminController.getWallet);
adminRouter.get('/logout', adminController.logoutAdmin); 

adminRouter.post('/login', adminController.loginAdmin); 
adminRouter.post('/logout', adminController.logoutAdmin); 


adminRouter.put('/verifyClient/accept',adminController.verifyAccept);

adminRouter.patch('/blockUser/:userId', adminController.blockUser);
adminRouter.patch('/unBlockUser/:userId', adminController.unBlockUser);

adminRouter.patch('/blockClient/:clientId', adminController.blockClient);
adminRouter.patch('/unBlockClient/:clientId', adminController.unBlockClient);




adminRouter.get('/refresh-token', async (req: any, res: any) => {
  try {
    const refreshToken = req.cookies.jwtU;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const ADMIN_REFRESH_TOKEN: any = process.env.ADMIN_REFRESH_TOKEN;
    const ADMIN_ACCESS_TOKEN: any = process.env.ADMIN_ACCESS_TOKEN;

    // Verify the refresh token
    const decoded: any = jwt.verify(refreshToken, ADMIN_REFRESH_TOKEN);

    // Find admin in the database
    const admin = await AdminModel.findById(decoded.id);
    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      ADMIN_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      ADMIN_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    // Update refresh token in DB
    admin.refreshToken = newRefreshToken;
    await admin.save();

    // Send new tokens
    res.cookie('jwtA', newRefreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default adminRouter;