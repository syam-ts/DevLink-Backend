import jwt from "jsonwebtoken"; 

export const userAuth = async (req: any, res: any, next: any) => {

  try {  
    
    const { token } = req.cookies; 
    console.log('ente', req.cookies.token)

    if (!token) {  
      throw new Error("Token not valid");
    }

    const secret = 'devLink$auth123';

    const currentUser = await jwt.verify(token, secret);

    if(!currentUser) {
      throw new Error('Token Invalid')
    }

    console.log('THe curr user', currentUser);

    console.log('tge re', req.user)

     req.user = currentUser;
     console.log('after re', req.user)
    next();
  } catch (err: any) {
    res.status(404).send(err.message);
  }
};