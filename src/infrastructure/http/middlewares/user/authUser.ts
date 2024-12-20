import jwt from "jsonwebtoken"; 

export const userAuth = async (req: any, res: any, next: any) => {

  try {  
    console.log('First')
    
    const { token } = await req.cookies;  
    console.log('the main token  : ', token)
    
    if (!token) {  
      throw new Error('Invalid Token');
    }

    const secret = 'devLink$auth123';

    const currentUser = await jwt.verify(token, secret);

    if(!currentUser) {
      throw new Error('Invalid Token');
    }; 

     req.user = currentUser; 

    next();
  } catch (err: any) {
    console.log('auth error', err.message)
    return res.status(400).json({message: err.message , type: 'error'});
  }
};