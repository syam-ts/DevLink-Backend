import { SignupClient } from '../../../application/usecases/client/signupClient';
import { LoginClient } from '../../../application/usecases/client/loginClient';
import { GoogleLoginClient } from '../../../application/usecases/client/GoogleLoginClient';
import { ClientRepositoryMongoose } from '../../../domain/interfaces/Repositaries/ClientRepositoryMongoose';  
import { getHomeClient } from '../../../application/usecases/client/getHomeClient';
import { LogoutClient } from '../../../application/usecases/client/logoutClient';
import { verifyOtp } from '../../../application/usecases/client/otpClient';


const ClientRepository = new ClientRepositoryMongoose();
const signupUseCase = new SignupClient(ClientRepository); 
const loginUseCase = new LoginClient(ClientRepository);
const getHomeUseCase = new getHomeClient(ClientRepository);
const logoutClientUseCase = new LogoutClient(ClientRepository);
const verifyClientUseCase = new verifyOtp(ClientRepository);
const GoogleLoginClientUseCase = new GoogleLoginClient(ClientRepository);

 

 
 export const clientController = {
       signupClient: async (req: any, res: any) => {
             try {
                 // console.log('req.body : ', req.body);
                 const otp = await signupUseCase.execute(req.body);
                
                 if(otp) {
                     res.status(201).json({message: 'Registration successed', data: req.body, otp, type: 'success'});
 
                 }  
                 
             } catch (err: any) {
                 res.status(400).json({message: err.message, type: 'error'});
             }
         },
 
 
         verifyOtp : async (req: any, res: any ) => {
           try{
             // POST otp =  {
             //     client: {
             //       name: 'Syam',
             //       password: 'syamWnanddhu3@gmail.com',
             //       email: 'syamnanddhu3@gmail.com',
             //       mobile: '8848700346'
             //     },
             //     mailOtp: 1111,
             //     clientOtp: { otp: '1111' }
             //   }
   

             const client = await verifyClientUseCase.execute(req.body);
  
             
                 res.json({message: 'OTP verified successfully', type: 'success'})
            
           } catch(err: any) {
               res.json({message: err.message, type: 'error'})
           }
 
         },
 
         loginClient: async (req: any, res: any) => {
             try{
                
                  const client = await loginUseCase.execute(req.body); 
 
                  if(!client) {
                     res.json({message: 'client not found', type: 'error'})
                  } else {
 
                     res.cookie("jwt", client.jwt, {
                         httpOnly: true, 
                         sameSite: "None", 
                         secure: true, 
                         maxAge: 24 * 60 * 60 * 1000
                       }
                     );
                     return res.json({message: "successfully login",client: client, type: 'success'});
                }
             }catch(err: any) { 
                 res.json({message: err.message, type: 'error'}); 
             }
         },
 
 
         googleLogin: async (req: any, res: any) => {
             try {
                 const client = await GoogleLoginClientUseCase.execute(req.body);
                 res.json({message: "successfully login", type: 'success'});
 
             } catch (err: any) {
                 res.json({message: err.message, type: 'error'});
             }
         },
 
 
         getHomeClient: async (req: any, res: any) => {
             try{
  
                
                const users = await getHomeUseCase.execute();
 
                res.cookie("jwt", req.client.accessToken, {
                 httpOnly: true, 
                 sameSite: "None", 
                 secure: true, 
                 maxAge: 24 * 60 * 60 * 1000
               }
             );
             return res.json({message: "successfully login",data: users, type: 'success'});
               
 
             }catch(err: any) {
                 res.json({message: err.message, type: 'error'})
             }
         },
 
 
         logoutClient: async (req: any, res: any) => {
             try{
                
                 res.clearCookie("jwt", { path: '/'}); 
                res.json({message: 'successfully loggedout', type: 'success'});
 
             }catch(err: any) {
                 res.json({message: err.message, type: 'error'})
             }
         },
         
     }