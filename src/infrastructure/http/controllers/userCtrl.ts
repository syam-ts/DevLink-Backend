import { SignupUser } from '../../../application/usecases/user/signupUser';
import { LoginUser } from '../../../application/usecases/user/loginUser';
import { GoogleLoginUser } from '../../../application/usecases/user/GoogleLoginUser';
import { getHomeUser } from '../../../application/usecases/user/getHomeUser';
import { LogoutUser } from '../../../application/usecases/user/logoutUser';
import { verifyOtp } from '../../../application/usecases/user/otpUser';
import { UserRepositoryMongoose } from '../../../domain/interfaces/Repositaries/UserRepositoryMongoose ';  
import jwt from 'jsonwebtoken';

const userRepository = new UserRepositoryMongoose();
const signupUseCase = new SignupUser(userRepository); 
const loginUseCase = new LoginUser(userRepository);
const getHomeUseCase = new getHomeUser(userRepository);
const logoutUserUseCase = new LogoutUser(userRepository);
const verifyUserUseCase = new verifyOtp(userRepository);
const GoogleLoginUserUseCase = new GoogleLoginUser(userRepository);

export const userController = {
      signupUser: async (req: any, res: any) => {
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

            console.log('req body', req.body)
            const user = await verifyUserUseCase.execute(req.body);

            
                res.json({message: 'OTP verified successfully', type: 'success'})
           
          } catch(err: any) {
              res.json({message: err.message, type: 'error'})
          }

        },

        loginUser: async (req: any, res: any) => {
            try{
                 const user = await loginUseCase.execute(req.body);
                 console.log('use',user)
                 if(!user) {
                    res.json({message: 'user not found', type: 'error'})
                 } else {

                    res.cookie("token", user.token, {
                        httpOnly: true, 
                        secure: false, 
                        sameSite: "lax", 
                        maxAge: 24 * 60 * 60 * 1000
                      }
                    );
                     res.json({message: "successfully login",user: user, type: 'success'});
               }
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


        getHomeUser: async (req: any, res: any) => {
            try{
               

               const clients = await getHomeUseCase.execute();
               res.json({message: 'successfully loaded clients', data: clients, type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },


        logoutUser: async (req: any, res: any) => {
            try{
               
                res.clearCookie("token", { path: '/'}); 
               res.json({message: 'successfully loggedout', type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        
    }