import jwt, { JwtPayload } from "jsonwebtoken";
import generateTokens from "../../../../utils/generateTokens";
import { Request, Response } from "express";

interface User {
    _id: string
    role: string
  };

const refreshToken = (req: Request, res: Response): void => {
    const refreshToken = req.cookies.refreshToken; 

    if (!refreshToken)
          res.status(401).json({ message: "No refresh token" });

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
            if (err)
                return res
                    .status(403)
                    .json({ message: "Invalid or expired refresh token" });

            const { accessToken } = generateTokens(decoded as User);
            res.json({ accessToken });
        }
    );
    return;
};

export default refreshToken;
