import jwt from "jsonwebtoken"; 

export const userAuth = async (req: any, res: any, next: any) => {

  try {
    console.log('the tok', req.cookies);

    const { token } = req.cookies;
    console.log('rel', token)

    if (!token) {
      throw new Error("Token not valid");
    }

    const secret = 'devLink$auth123';

    const currentUser = await jwt.verify(token, secret);

    console.log('THe curr user', currentUser);


    // req.user = currentUser;
    next();
  } catch (err: any) {
    res.status(404).send(err.message);
  }
};