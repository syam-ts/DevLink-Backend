import { SignupUser } from '../../../application/usecases/user/signupUser';
import { LoginUser } from '../../../application/usecases/user/loginUser';
import { UserRepositoryMongoose } from '../../repositories/userRepositoryMongoose'; 

const userRepository = new UserRepositoryMongoose();
const signupUseCase = new SignupUser(userRepository); 
const loginUseCase = new LoginUser(userRepository)

export const userController = {
      signupUser: async (req: any, res: any) => {
            try {
                console.log('req.body', req.body)
                const user = await signupUseCase.execute(req.body);
                res.status(201).json(user);
            } catch (err: any) {
                res.status(400).json({error: err.message});
            }
        },

        loginUser: async (req: any, res: any) => {
            try{
                 const user = await loginUseCase.execute(req.body);
                res.send('Home Page User')
            }catch(err) {
                console.error(err)
            }
        }
    }