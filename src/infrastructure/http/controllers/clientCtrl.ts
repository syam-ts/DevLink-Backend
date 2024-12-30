import { SignupClient } from '../../../application/usecases/client/signupClient';
import { LoginClient } from '../../../application/usecases/client/loginClient';
import { GoogleLoginClient } from '../../../application/usecases/client/GoogleLoginClient';
import { ClientRepositoryMongoose } from '../../../domain/interfaces/Repositaries/ClientRepositoryMongoose';  
import { getHomeClient } from '../../../application/usecases/client/getHomeClient';
import { LogoutClient } from '../../../application/usecases/client/logoutClient';
import { VerifyEmail } from '../../../application/usecases/client/verifyEmail';
import { ResetPassword } from '../../../application/usecases/client/resetPassword';
import { verifyOtp } from '../../../application/usecases/client/otpClient';
import { EditClientProfile } from '../../../application/usecases/client/EditClientProfile';
import { GetClientProfile } from '../../../application/usecases/client/getProfile';
import { ProfileVerification } from '../../../application/usecases/client/profileVerification';
import { CreateJobPost } from '../../../application/usecases/client/createJobPost';
import { GetAllNotifications } from '../../../application/usecases/client/getAllNotifications';
import { ListAllJobs } from '../../../application/usecases/client/listAllJobs';
import { MakePayment } from '../../../application/usecases/client/makePayment';


const ClientRepository = new ClientRepositoryMongoose();
const signupUseCase = new SignupClient(ClientRepository); 
const loginUseCase = new LoginClient(ClientRepository);
const getHomeUseCase = new getHomeClient(ClientRepository);
const logoutClientUseCase = new LogoutClient(ClientRepository);
const verifyClientUseCase = new verifyOtp(ClientRepository);
const verifyEmailUseCase = new VerifyEmail(ClientRepository);
const resetPasswordUseCase = new ResetPassword(ClientRepository);
const GoogleLoginClientUseCase = new GoogleLoginClient(ClientRepository);
const editClientProfileUseCase = new EditClientProfile(ClientRepository);
const getClientProfileUseCase = new GetClientProfile(ClientRepository);
const profileVerificationUseCase = new ProfileVerification(ClientRepository);
const createJobPostUseCase = new CreateJobPost(ClientRepository);
const getAllNotificationsUseCase = new GetAllNotifications(ClientRepository);
const listAllJobsUseCase = new ListAllJobs(ClientRepository);
const makePaymentUseCase = new MakePayment();
 

 
 export const clientController = {
       signupClient: async (req: any, res: any) => {
             try {
                 
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

             const client = await verifyClientUseCase.execute(req.body); 
                 res.json({message: 'OTP verified successfully', type: 'success'})
            
           } catch(err: any) {
               res.json({message: err.message, type: 'error'})
           } 
         },

         resendOtp: async(req: any, res: any) => {
            try{

                const client =  await signupUseCase.execute(req.body);

                console.log('new otp ', client)

                res.json({ message: 'OTP resend successfully',newOtp: client, type: 'success'});

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
 
            const { clientId } = req.params;
            const { password } = req.body;

            console.log('The toal ', clientId, 'pass', password)

              const response = await resetPasswordUseCase.execute(clientId, password);
 
               res.json({message: 'Password Reset Successfully', type: 'success'});

           }catch(err: any) {
            res.json({message: err.message, type: 'error'});
           }
        },
 
        
         loginClient: async (req: any, res: any) => {
             try{
                
                  const client = await loginUseCase.execute(req.body);  
                  if(!client) {
                     res.json({message: 'client not found', type: 'error'})
                  } else {
 
                     res.cookie("jwtC", client.jwt, {
                         httpOnly: true, 
                         sameSite: "None", 
                         secure: true, 
                         maxAge: 24 * 60 * 60 * 1000
                       }
                     );
                     console.log("The whole data : ", client)
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
                res.cookie("jwtC", req.client.accessToken, {
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

         getProfile: async (req: any, res: any) => {
            try{
                const { clientId } = req.params;

               const client = await getClientProfileUseCase.execute(clientId);

               res.json({message: 'successfully loaded client ', data: client, type: 'success'});

            } catch(err: any) {
                res.json({ message: err.messge , type: 'error' });
            }
         },

         profileVerification: async (req: any, res: any) => {
            try{ 

                const { clientId } = req.params; 
                 const response = await profileVerificationUseCase.execute(clientId, req.body); 

                 res.json({message: 'successfully sended', success: true });
            }catch(err: any) {
                res.json({ message: err.message, success: false });
            }
         },

         editProfile: async (req: any, res: any) => {

            try{     
                const { clientId } = req.params;
                const editClient = await editClientProfileUseCase.execute(clientId, req.body);
               
                res.json({ message: 'successfully edited', success: true });
            }catch(err: any) {
                res.json({message: err.message, success: false });
            }
         },

 
         logoutClient: async (req: any, res: any) => {

             try{    
                 res.clearCookie("jwtC", { path: '/'}); 
                res.json({message: 'successfully loggedout', type: 'success'});
 
             }catch(err: any) {
                 res.json({message: err.message, type: 'error'})
             }
         },

 
         createJobPost: async (req: any, res: any) => {

             try{      
                const jobPost = await createJobPostUseCase.execute(req.body);
    

                res.json({message: 'Redirecting to payment page',data: jobPost, success: true});
             }catch(err: any) {
                 res.json({message: err.message, type: 'error'})
             }
         },

 
         getAllNotifications: async (req: any, res: any) => {
             try{
                
                const {  clientId }= req.params;
                const response = await getAllNotificationsUseCase.execute( clientId);


                console.log('Final conrtoller jobpost', response)

                res.json({message: 'successfully list all notifications', type: 'success'});
 
             }catch(err: any) {
                 res.json({message: err.message, type: 'error'})
             }
         },
 
         listAllJobs: async (req: any, res: any) => {
             try{
                 
                const response = await listAllJobsUseCase.execute(); 

                res.json({message: 'successfully list all notifications',data: response, success: true}); 
             }catch(err: any) {
                 res.json({message: err.message, success: false})
             }
         },

         
         makePayment: async (req: any, res: any) => {
             try{
                 
                const response = await makePaymentUseCase.execute(req.body); 

                res.json({message: 'successfully list all notifications',data: response, success: true}); 
             }catch(err: any) {
                 res.json({message: err.message, success: false})
             }
         },


 
         
     }


     //verify OTP sample json
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