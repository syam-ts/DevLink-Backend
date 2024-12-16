import jwt from "jsonwebtoken";
import { User } from "../../../../domain/entities/User";

export const userAuth = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token not valid");
    }

    const decodedObj = await jwt.verify(token, "devLink$auth123");

    const { email }: any = decodedObj;

    // const user = await User.findOnlyByEmail(email);

    // if (!user) {
    //   throw new Error("User not found");
    // }

    // req.user = user;
    next();
  } catch (err: any) {
    res.status(404).send(err.message);
  }
};