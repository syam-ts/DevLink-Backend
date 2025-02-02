import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../../../helper/constants/enums';
import { StatusMessage } from '../../../../helper/constants/stausMessages';


const verifyToken = (req: any, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('ENTER VERIFY AND TKN : ', token)
    if(!token) {
         res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: StatusMessage[HttpStatusCode.UNAUTHORIZED] });
        return;
    };

    const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
        if(err) return res
        .status(HttpStatusCode.FORBIDDEN)
        .json({ message: StatusMessage[HttpStatusCode.FORBIDDEN] });

        req.user = decoded;
        next();
    });
};


export { verifyToken };