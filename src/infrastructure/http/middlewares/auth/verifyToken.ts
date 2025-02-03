import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../helper/constants/enums';
import { StatusMessage } from '../../../../helper/constants/stausMessages';


interface DecodedUser {
    id: string;
    role: 'user' | 'client' | 'admin';
    iat: number;
    exp: number;
}

const verifyToken = (req: any, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
  
    
    if(!token) {
         res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: StatusMessage[HttpStatusCode.UNAUTHORIZED] });
        return;
    };
  
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as DecodedUser;
  
        
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

  
        next();
 
};


export { verifyToken };