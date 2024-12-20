import jwt from "jsonwebtoken";

export const userAuth = async (req: any, res: any, next: any) => {

  try{

    const refreshToken = req.cookies.jwt;

    console.log('The Refresh Token : ', refreshToken);

    const USER_REFRESH_TOKEN: any = process.env.USER_REFRESH_TOKEN;
    const USER_ACCESS_TOKEN: any = process.env.USER_ACCESS_TOKEN; 

    if (!refreshToken) {
        return res.status(401).json({ message: "No token provided", type: "error" });
    }

    jwt.verify(refreshToken, USER_REFRESH_TOKEN, (err: any, decoded: any) => {
      if (err) {
          console.error('JWT Verification Error:', err.message);
          return res.status(403).json({ message: "Invalid Token", type: "error" });
      }

      // Create a new access token
      const accessToken = jwt.sign(
          { name: decoded.name, email: decoded.email },
              USER_REFRESH_TOKEN,
          { expiresIn: '15m' }
      );

      // Send the new access token
      req.user = { accessToken }; 
       next()
  });

  } catch(err: any) {

    console.error('Unexpected Error:', err.message);
    res.status(500).json({ message: "Internal Server Error", type: "error" });
  }
   
                // req.user = { accessToken };
 
};
