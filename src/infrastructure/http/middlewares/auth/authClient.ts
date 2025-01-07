import jwt from "jsonwebtoken";
import { ClientModel } from '../../../../domain/entities/Client';


export const clientAuth = async (req: any, res: any, next: any) => {
  try{
    
    console.log('Reched here')
           const refreshToken = req.cookies.jwtC;
           const accessToken = req.cookies.accessTokenC;
           
           
           const CLIENT_REFRESH_TOKEN: any = process.env.CLIENT_REFRESH_TOKEN;
           const CLIENT_ACCESS_TOKEN: any = process.env.CLIENT_ACCESS_TOKEN;
           
           if (!accessToken) {
             if (!refreshToken) {
               return res.status(401).json({ message: "No tokens provided", type: "error" });
             }
          
             // Verify and refresh tokens
             jwt.verify(refreshToken, CLIENT_REFRESH_TOKEN, async (err: any, decoded: any) => {
               if (err) {
                 return res.status(403).json({ message: "Invalid refresh token", type: "error" });
               }
       
               // Generate new tokens
               const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, CLIENT_ACCESS_TOKEN, { expiresIn: "15m" });
               const newRefreshToken = jwt.sign({ id: decoded.id, email: decoded.email }, CLIENT_REFRESH_TOKEN, { expiresIn: "7d" });
       
               // Update refresh token in the database
               const client = await ClientModel.findById(decoded.id);
               if (client) {
                 client.refreshToken = newRefreshToken;
                 await client.save();
               }
       
               // Set new cookies
               res.cookie("jwtC", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
               res.cookie("accessTokenC", newAccessToken, { httpOnly: true, secure: true, sameSite: "strict" });
       
               req.client = { id: decoded.id, email: decoded.email };
               next();
             });
           } else {
             
 
             jwt.verify(accessToken, CLIENT_ACCESS_TOKEN, (err: any, decoded: any) => {
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
