import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../../helper/constants/enums";
import { StatusMessage } from "../../../../helper/constants/stausMessages";

const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(HttpStatusCode.FORBIDDEN)
        .json({ message: StatusMessage[HttpStatusCode.FORBIDDEN] });
    }
    next();
  };
};

export { requireRole };
