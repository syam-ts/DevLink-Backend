import jwt from "jsonwebtoken";
import { ClientModel } from '../../../../domain/entities/Client';


export const clientAuth = async (req: any, res: any, next: any) => {
  try{
     
           const refreshToken = req.cookies.jwtC;
           const accessToken = req.cookies.accessTokenC;
           
           
           const CLIENT_REFRESH_TOKEN: any = process.env.CLIENT_REFRESH_TOKEN;
           const CLIENT_ACCESS_TOKEN: any = process.env.CLIENT_ACCESS_TOKEN;
           
           if (!accessToken) {
             if (!refreshToken) {
               return res.status(401).json({ message: "No tokens provided", type: "error" });
             }
          
             jwt.verify(refreshToken, CLIENT_REFRESH_TOKEN, async (err: any, decoded: any) => {
               if (err) {
                 return res.status(403).json({ message: "Invalid refresh token", type: "error" });
               }
       
               const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, CLIENT_ACCESS_TOKEN, { expiresIn: "15m" });
               const newRefreshToken = jwt.sign({ id: decoded.id, email: decoded.email }, CLIENT_REFRESH_TOKEN, { expiresIn: "7d" });
       
               const client = await ClientModel.findById(decoded.id);
               if (client) {
                 client.refreshToken = newRefreshToken;
                 await client.save();
               }
       
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
       
               req.user = { id: decoded.id, email: decoded.email };
               next();
             });
           }
         } catch (error) {
           res.status(500).json({ message: "Internal Server Error", type: "error" });
         }
};
