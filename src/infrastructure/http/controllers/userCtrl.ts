import { SignupUser } from '../../../application/usecases/user/signupUser';
import { LoginUser } from '../../../application/usecases/user/loginUser';
import { GoogleLoginUser } from '../../../application/usecases/user/GoogleLoginUser';
import { getHomeUser } from '../../../application/usecases/user/getHomeUser';
import { LogoutUser } from '../../../application/usecases/user/logoutUser';
import { verifyOtp } from '../../../application/usecases/user/otpUser';
import { VerifyEmail } from '../../../application/usecases/user/verifyEmail';
import { ResetPassword } from '../../../application/usecases/user/resetPassword';
import { UserRepositoryMongoose } from '../../../domain/interfaces/Repositaries/UserRepositoryMongoose '; 
import { EditUserProfile } from '../../../application/usecases/user/editProfile' 
import { GetUserProfile } from '../../../application/usecases/user/getProfile' 
 

const userRepository = new UserRepositoryMongoose();
const signupUseCase = new SignupUser(userRepository); 
const loginUseCase = new LoginUser(userRepository);
const getHomeUseCase = new getHomeUser(userRepository);
const logoutUserUseCase = new LogoutUser(userRepository);
const verifyEmailUseCase = new VerifyEmail(userRepository);
const resetPasswordUseCase = new ResetPassword(userRepository);
const verifyUserUseCase = new verifyOtp(userRepository);
const GoogleLoginUserUseCase = new GoogleLoginUser(userRepository);
const editProfileUseCase = new EditUserProfile(userRepository);
const getProfileUseCase = new GetUserProfile(userRepository);

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

        // jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3lhbSIsImVtYWlsIjoic3lhbW5hbmRodTNAZ21haWwuY29tIiwiaWF0IjoxNzM0Njc0NjQzLCJleHAiOjE3MzQ3NjEwNDN9.jQQ4grxILIC-ja6nCnAJsR7r3TO711oyNDqBx1RIXj4; 
        // Path=/; Secure; HttpOnly; Expires=Sat, 21 Dec 2024 06:04:03 GMT;

       

        verifyOtp : async (req: any, res: any ) => {
          try{
            // POST otp =  {
            //     user: {
            //       name: 'Syam',
            //       password: 'syamWnanddhu3@gmail.com',
            //       email: 'syamnanddhu3@gmail.com',
            //       mobile: '8848700346'
            //     },
            //     mailOtp: 1111,
            //     userOtp: { otp: '1111' }
            //   }
 
            const user = await verifyUserUseCase.execute(req.body);

            
                res.json({message: 'OTP verified successfully', type: 'success'})
           
          } catch(err: any) {
              res.json({message: err.message, type: 'error'})
          }

        },

        
        resendOtp: async(req: any, res: any) => {
            try{

                const user =  await signupUseCase.execute(req.body);

                res.json({ message: 'OTP resend successfully',newOtp:user, type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'});
            }
        },

        verifyEmail: async (req: any, res: any) => {
            try {
                const response = await verifyEmailUseCase.execute(req.body.email);
 
                res.json({message: "successfully sended", data: response ,type: 'success'})
            } catch (err: any) {
                 res.json({message: err.message, type: 'error'});
            }
        },
        

        resetPassword: async (req: any, res: any) => {
           try{

            console.log('The params', req.params)
            console.log('The pass', req.body)

            const { userId } = req.params;
            const { password } = req.body;

              const response = await resetPasswordUseCase.execute(userId, password);
 
               res.json({message: 'Password Reset Successfully', type: 'success'});

           }catch(err: any) {
            res.json({message: err.message, type: 'error'});
           }
        },

        loginUser: async (req: any, res: any) => {
            try{
               
                 const user = await loginUseCase.execute(req.body); 

                 if(!user) {
                    res.json({message: 'user not found', type: 'error'})
                 } else {

                    res.cookie("jwtU", user.jwt, {
                        httpOnly: true, 
                        sameSite: "None", 
                        secure: true, 
                        maxAge: 24 * 60 * 60 * 1000
                      }
                    );
                    return res.json({message: "successfully login",user: user, type: 'success'});
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

               res.cookie("jwtU", req.user.accessToken, {
                httpOnly: true, 
                sameSite: "None", 
                secure: true, 
                maxAge: 24 * 60 * 60 * 1000
              }
            );
            return res.json({message: "successfully login",data: clients, type: 'success'});
              

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },

        getProfile: async(req: any, res: any) => {
            try{

                const { userId } = req.params;
          
                const user = await getProfileUseCase.execute(userId);

                res.json({message: 'successfully loaded user data', data: user,  type: 'success'})


            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },


        editProfile: async(req: any, res: any) => {
            try{ 
                console.log('The whole body : ', req.body)

                const { userId } = req.params; 

             const updated = await editProfileUseCase.execute(userId, req.body);
          
             res.json({message: 'Profile successfully edited', type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'});
            }
        },


        logoutUser: async (req: any, res: any) => {
            try{

               
                res.clearCookie("jwtU", { path: '/'}); 
               res.json({message: 'successfully loggedout', type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'})
            }
        },
        
    }