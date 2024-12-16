import { SignupClient } from '../../../application/usecases/client/signupClient';
import { LoginClient } from '../../../application/usecases/client/loginClient';
import { GoogleLoginClient } from '../../../application/usecases/client/GoogleLoginClient';
import { ClientRepositoryMongoose } from '../../../domain/interfaces/Repositaries/ClientRepositoryMongoose';  

const ClientRepository = new ClientRepositoryMongoose();
const signupUseCase = new SignupClient(ClientRepository); 
const loginUseCase = new LoginClient(ClientRepository);
const GoogleLoginClientUseCase = new GoogleLoginClient(ClientRepository);

export const ClientController = {
      signupClient: async (req: any, res: any) => {
            try {
                console.log('req.body', req.body)
                const Client = await signupUseCase.execute(req.body);
                res.status(201).json({message: 'Registration successed', type: 'success'});
            } catch (err: any) {
                res.status(400).json({message: err, type: 'error'});
            }
        },


        loginClient: async (req: any, res: any) => {
            try{
                 const client = await loginUseCase.execute(req.body);
                 console.log('the return cookie ', client);
                 res.cookie("token", client);
                res.json({message: "successfully login", type: 'success'});
            }catch(err: any) {
                res.json({message: err.message, type: 'error'});
            }
        },


        googleLogin: async (req: any, res: any) => {
            try {
                const Client = await GoogleLoginClientUseCase.execute(req.body);
                res.json({message: "successfully login", type: 'success'});


            } catch (err: any) {
                res.json({message: err.message, type: 'error'});
            }
        },


        // getHomeClient: async (req: any, res: any) => {
        //     try{


        //     }catch(err: any) {
        //         res.json({message: err.message, type: 'error'})
        //     }
        // }
        
    }