import jwt from "jsonwebtoken";

export const adminAuth = async (req: any, res: any, next: any) => {

  try{ 
    const refreshToken = req.cookies.jwtA;
 

    const ADMIN_REFRESH_TOKEN: any = process.env.ADMIN_REFRESH_TOKEN;
    const ADMIN_ACCESS_TOKEN: any = process.env.ADMIN_ACCESS_TOKEN; 

    if (!refreshToken) {
        return res.status(401).json({ message: "No token provided", type: "error" });
    }

    jwt.verify(refreshToken, ADMIN_REFRESH_TOKEN, (err: any, decoded: any) => {
      if (err) {
          console.error('JWT Verification Error:', err.message);
          return res.status(403).json({ message: "Invalid Token", type: "error" });
      }

      // Create a new access token
      const accessToken = jwt.sign(
          { name: decoded.name },
               ADMIN_REFRESH_TOKEN,
          { expiresIn: '15m' }
      );

      // Send the new access token
      req.admin = { accessToken }; 
       next()
  });

  } catch(err: any) {

    console.error('Unexpected Error:', err.message);
    res.status(500).json({ message: "Internal Server Error", type: "error" });
  } 
 
};
