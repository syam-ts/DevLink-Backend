import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { HttpStatusCode } from "../../../../helper/constants/enums";
import { StatusMessage } from "../../../../helper/constants/stausMessages";

interface DecodedUser {
  _id: string;
  role: "user" | "client" | "admin";
  iat: number;
  exp: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: StatusMessage[HttpStatusCode.UNAUTHORIZED],
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as DecodedUser;
    
    req.user = { id: decoded._id, role: decoded.role };
    
    return next();  
  } catch (error) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: error,
    });
    return; 
  }
};


export { verifyToken };
