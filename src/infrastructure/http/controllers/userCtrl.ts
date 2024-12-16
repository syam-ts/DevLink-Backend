import { SignupUser } from '../../../application/usecases/user/signupUser';
import { LoginUser } from '../../../application/usecases/user/loginUser';
import { GoogleLoginUser } from '../../../application/usecases/user/GoogleLoginUser';
import { UserRepositoryMongoose } from '../../repositories/userRepositoryMongoose';  

const userRepository = new UserRepositoryMongoose();
const signupUseCase = new SignupUser(userRepository); 
const loginUseCase = new LoginUser(userRepository);
const GoogleLoginUserUseCase = new GoogleLoginUser(userRepository);

export const userController = {
      signupUser: async (req: any, res: any) => {
            try {
                console.log('req.body', req.body)
                const user = await signupUseCase.execute(req.body);
                res.status(201).json({message: 'Registration successed', type: 'success'});
            } catch (err: any) {
                res.status(400).json({message: err, type: 'error'});
            }
        },


        loginUser: async (req: any, res: any) => {
            try{
                 const user = await loginUseCase.execute(req.body);
                 console.log('the return cookie ', user);
                 res.cookie(user);
                res.json({message: "successfully login", type: 'success'});
            }catch(err: any) {
                res.json({message: err.message, type: 'error'});
            }
        },


        googleLogin: async (req: any, res: any) => {
            try {
                const user = await GoogleLoginUserUseCase.execute(req.body);
                res.json({message: "successfully login", type: 'success'});


            } catch (err: any) {
                res.json({message: err.message, type: 'error'});
            }
        },


        // getHomeUser: async (req: any, res: any) => {
        //     try{


        //     }catch(err: any) {
        //         res.json({message: err.message, type: 'error'})
        //     }
        // }
        
    }