import jwt from 'jsonwebtoken';

const generateTokens = (user: any) => { 


    if (!user || !user._id) {
        console.error("❌ ERROR: User ID is missing in generateTokens. User object:", user);
        throw new Error("User ID is missing in generateTokens");
    }
 
    console.log("✅ GENERATING TOKENS FOR USER:", { id: user._id.toString(), role: user.role });

    const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;

    console.log('THE USER ID : ', user._id.toString())
  

    const accessToken = jwt.sign(
        {id: user._id.toString(), role: user.role},
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"}
    );
 
   

    


    // # Specific refresh token secret keys ------ >
    // let refreshSecret: any;
    // if (user.role === "user") {
    //     refreshSecret = process.env.USER_REFRESH_TOKEN_SECRET as string;
    // } else if (user.role === "client") {
    //     refreshSecret = process.env.CLIENT_REFRESH_TOKEN_SECRET as string;
    // } else if (user.role === "admin") {
    //     refreshSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET as string;
    // }const generateTokens = (user: any) => {

 

    const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;

    const refreshToken = jwt.sign(
        {id: user._id.toString(), role: user.role},
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d'}
    );

    return { accessToken , refreshToken}
};


export default generateTokens;