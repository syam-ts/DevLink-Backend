import jwt from 'jsonwebtoken';

const generateTokens = (user: any) => { 

    const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;

    const accessToken = jwt.sign(
        {id: user._id, role: user.role},
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"}
    );
    console.log('RFRESH TKN : ', process.env.REFRESH_TOKEN_SECRET)

    const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;


    // # Specific refresh token secret keys ------ >
    // let refreshSecret: any;
    // if (user.role === "user") {
    //     refreshSecret = process.env.USER_REFRESH_TOKEN_SECRET as string;
    // } else if (user.role === "client") {
    //     refreshSecret = process.env.CLIENT_REFRESH_TOKEN_SECRET as string;
    // } else if (user.role === "admin") {
    //     refreshSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET as string;
    // }

    const refreshToken = jwt.sign(
        {id: user._id, role: user.role},
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d'}
    );

    return { accessToken , refreshToken}
};


export default generateTokens;