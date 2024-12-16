import { SignupUser } from '../../../application/usecases/user/signupUser';
import { LoginUser } from '../../../application/usecases/user/loginUser';
import { GoogleLoginUser } from '../../../application/usecases/user/GoogleLoginUser';
import { getHomeUser } from '../../../application/usecases/user/getHomeUser';
import { UserRepositoryMongoose } from '../../../domain/interfaces/Repositaries/UserRepositoryMongoose ';  

const userRepository = new UserRepositoryMongoose();
const signupUseCase = new SignupUser(userRepository); 
const loginUseCase = new LoginUser(userRepository);
const getHomeUseCase = new getHomeUser(userRepository);
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
                 console.log('the return cookies ', user);
                 res.cookie("token", user);
                res.json({message: "successfully login", type: 'success'});
            }catch(err: any) {
                console.log({message: err, type: 'error'});
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


        getHomeUser: async (req: any, res: any) => {
            try{
               const clients = await getHomeUseCase.execute();
               res.json({message: 'successfully loaded clients', data: clients, type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        }
        
    }