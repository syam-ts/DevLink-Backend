import jwt from "jsonwebtoken";

interface User {
  _id: string
  role: string
};

const generateTokens = (user: User) => {
  if (!user || !user._id) {
    throw new Error("User ID is missing in generateTokens");
  }

  const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
  const accessToken = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );

  const REFRESH_TOKEN_SECRET: string = process.env
    .REFRESH_TOKEN_SECRET as string;
  const refreshToken = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;
