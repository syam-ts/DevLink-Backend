import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const userAuth = async (req: any, res: any, next: NextFunction) => {
  try {
    const accessToken = req.headers["authorization"];

    if (!accessToken) {
      return res.status(401).json({ message: "Access token expired" });
    }
    const refreshToken = req.cookies.refreshU;
    if (!refreshToken) {
      return res.status(401).json({ message: "No tokens provided" });
    }

    const USER_REFRESH_TOKEN: string = process.env.USER_REFRESH_TOKEN as string;
    const USER_ACCESS_TOKEN: string = process.env.USER_ACCESS_TOKEN as string;

    jwt.verify(refreshToken, USER_REFRESH_TOKEN, (err: any, decoded: any) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token" });
      }

      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        USER_ACCESS_TOKEN,
        { expiresIn: "15m" }
      );

      res.cookie("accessTokenU", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      req.user = { id: decoded.id, email: decoded.email };

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error("Error in userAuth middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
