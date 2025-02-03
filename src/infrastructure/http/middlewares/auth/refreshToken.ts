import jwt from "jsonwebtoken";
import generateTokens from "../../../../utils/generateTokens";


const refreshToken = (req: any, res: any) => {

    const refreshToken = req.cookies.refreshToken;  
    console.log('TEH REFRSH TKN : ', refreshToken)
    
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired refresh token' });
  
        console.log('THE DEDCODE : ', decoded)
        const { accessToken } = generateTokens(decoded); 
        res.json({ accessToken });
    });
};


export default refreshToken