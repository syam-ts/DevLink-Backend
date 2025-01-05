import jwt from "jsonwebtoken";
import { UserModel } from '../../../../domain/entities/User'
import { Request, Response, NextFunction } from "express";

 
    export const userAuth = async (req: any, res: any, next: NextFunction) => {
      try {
        const refreshToken = req.cookies.jwtU;
        const accessToken = req.cookies.accessTokenU;
        
        
        const USER_REFRESH_TOKEN: any = process.env.USER_REFRESH_TOKEN;
        const USER_ACCESS_TOKEN: any = process.env.USER_ACCESS_TOKEN;
        
        if (!accessToken) {
          if (!refreshToken) {
            return res.status(401).json({ message: "No tokens provided", type: "error" });
          }
       
          // Verify and refresh tokens
          jwt.verify(refreshToken, USER_REFRESH_TOKEN, async (err: any, decoded: any) => {
            if (err) {
              return res.status(403).json({ message: "Invalid refresh token", type: "error" });
            }
    
            // Generate new tokens
            const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, USER_ACCESS_TOKEN, { expiresIn: "15m" });
            const newRefreshToken = jwt.sign({ id: decoded.id, email: decoded.email }, USER_REFRESH_TOKEN, { expiresIn: "7d" });
    
            // Update refresh token in the database
            const user = await UserModel.findById(decoded.id);
            if (user) {
              user.refreshToken = newRefreshToken;
              await user.save();
            }
    
            // Set new cookies
            res.cookie("jwtU", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
            res.cookie("accessTokenU", newAccessToken, { httpOnly: true, secure: true, sameSite: "strict" });
    
            req.user = { id: decoded.id, email: decoded.email };
            next();
          });
        } else {
          
             
          console.log('The token 3 : ', refreshToken)
          jwt.verify(accessToken, USER_ACCESS_TOKEN, (err: any, decoded: any) => {
            if (err) {
              return res.status(403).json({ message: "Access token expired", type: "error" });
            }
            console.log('id : ', decoded)
    
            req.user = { id: decoded.id, email: decoded.email };
            next();
          });
        }
      } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ message: "Internal Server Error", type: "error" });
      }
    };