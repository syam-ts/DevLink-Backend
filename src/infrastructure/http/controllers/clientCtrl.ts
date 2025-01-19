import {allClientUseCases } from '../../../helper/controllerHelper/allCtrlConnection'
 

 
 export const clientController = {
       signupClient: async (req: any, res: any) => {
             try {
               
                 const otp = await allClientUseCases.signupClientUseCase.execute(req.body); 
                 if(otp) {
                     res.status(201).json({message: 'Registration successed', data: req.body, otp, type: 'success'});
 
                 }   
             } catch (err: any) {
                 res.status(400).json({message: err.message, type: 'error'});
             }
         }, 
 
         verifyOtp : async (req: any, res: any ) => {
           try{  

             const client = await allClientUseCases.verifyClientUseCase.execute(req.body); 
                 res.json({message: 'OTP verified successfully', type: 'success'})
            
           } catch(err: any) {
               res.json({message: err.message, type: 'error'})
           } 
         },

         resendOtp: async(req: any, res: any) => {
            try{

                const client =  await allClientUseCases.signupClientUseCase.execute(req.body); 

                res.json({ message: 'OTP resend successfully',newOtp: client, type: 'success'});

            }catch(err: any) {
                res.json({message: err.message, type: 'error'});
            }
        },
        

        verifyEmail: async (req: any, res: any) => {
            try {
                const response = await allClientUseCases.verifyEmailClientUseCase.execute(req.body.email);
 
                res.json({message: "successfully sended", data: response ,type: 'success'})
            } catch (err: any) {
                 res.json({message: err.message, type: 'error'});
            }
        },
        

        resetPassword: async (req: any, res: any) => {
           try{
                const { clientId } = req.params;
                const { password } = req.body;
                const response = await allClientUseCases.resetPasswordClientUseCase.execute(clientId, password);
 
                res.json({message: 'Password Reset Successfully', type: 'success'});
           }catch(err: any) {
            res.json({message: err.message, type: 'error'});
           }
        },
 
        
         loginClient: async (req: any, res: any) => {
             try{
                
                  const response: any = await allClientUseCases.loginClientUseCase.execute(req.body);  
                  const { client, refreshToken, accessToken} = response.client;
                   
                  if(!client) {
                     res.json({message: 'client not found', type: 'error'})
                  } else {
                     res.cookie("jwtC", refreshToken, {
                         httpOnly: true, 
                         sameSite: "None", 
                         secure: true, 
                         maxAge: 24 * 60 * 60 * 1000
                       }
                     );
                     
                     res.cookie("accessTokenC", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
                     return res.json({message: "successfully login",data: response, type: 'success'});
                }
             }catch(err: any) { 
                 res.json({message: err.message, type: 'error'}); 
             }
         },
  
         googleLogin: async (req: any, res: any) => {
             try {

                 const client = await allClientUseCases.GoogleLoginClientUseCase.execute(req.body);
                 res.json({message: "successfully login", type: 'success'});
             } catch (err: any) {
                 res.json({message: err.message, type: 'error'});
             }
         },
  
         getHomeClient: async (req: any, res: any) => {
             try{ 

                const users = await allClientUseCases.getHomeClientUseCase.execute(); 
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

               const client = await allClientUseCases.getClientProfileUseCase.execute(clientId);

               res.json({message: 'successfully loaded client ', data: client, type: 'success'});

            } catch(err: any) {
                res.json({ message: err.messge , type: 'error' });
            }
         },


         profileVerification: async (req: any, res: any) => {
            try{ 

                const { clientId } = req.params; 
                
                 const response = await allClientUseCases.profileVerificationUseCase.execute(clientId, req.body); 
               
                 res.json({message: 'successfully sended', success: true });
            }catch(err: any) {
                res.json({ message: err.message, success: false });
            }
         },


         editProfile: async (req: any, res: any) => {
            try{     
               
        
                const { clientId } = req.params;
                const response = await allClientUseCases.editClientProfileUseCase.execute(clientId, req.body);
               
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
                 const { clientId } = req.params;
                
                  const { data } = req.body;
 
                const jobPost = await allClientUseCases.createJobPostUseCase.execute(clientId, data);
             
                res.json({message: 'Redirecting to payment page',data: jobPost, success: true});
             }catch(err: any) {
                 res.json({message: err.message, type: 'error'})
             }
         },

 
         getAllNotifications: async (req: any, res: any) => {
             try{
                
                const {  clientId }= req.params;
                const response = await allClientUseCases.getAllNotificationsUseCase.execute( clientId);
  
                res.json({message: 'successfully list all notifications', type: 'success'});
             }catch(err: any) {
                 res.json({message: err.message, type: 'error'})
             }
         },
 
         listAllJobs: async (req: any, res: any) => {
             try{
                const response = await allClientUseCases.listAllJobsClientUseCase.execute(); 

                res.json({message: 'successfully list all notifications',data: response, success: true}); 
             }catch(err: any) {
                 res.json({message: err.message, success: false})
             }
         },

         
         makePayment: async (req: any, res: any) => {
             try{ 
                 const { clientId } = req.params; 
                  const response = await allClientUseCases.makePaymentUseCase.execute(clientId, req.body); 
             
                  res.status(200).json({ response, success: true }); 
             }catch(err: any) { 
                 res.json({message: err.message, success: false});
             }
         },


 
         getUserProfile: async (req: any, res: any) => {
             try{
                 
                const { userId } = req.params;
                const response = await allClientUseCases.getUserProfileUseCase.execute(userId); 
                
                res.status(200).json({ response }); 
             }catch(err: any) {
                 res.json({message: err.message, success: false})
             }
         },
         

         getProposals: async(req: any, res: any) => {
            try{
                const { clientId } = req.params;
                const response = await allClientUseCases.getProposalsUseCase.execute(clientId);
                
                res.status(200).json({message: 'Loading propsals', data: response, success: true});
            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
         },

         getMyJobs: async(req: any, res: any) => {
            try{
                const { clientId } = req.params;
                const response = await allClientUseCases.getMyJobsUseCase.execute(clientId);
                
                res.status(200).json({message: 'Loading propsals', data: response, success: true});
            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
         },

         latestJobs: async(req: any, res: any) => {
            try{
                
                const response = await allClientUseCases.latestJobsUseCase.execute();
                
                res.status(200).json({message: 'Loading propsals', data: response, success: true});
            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
         },

         createContract: async(req: any, res: any) => {
            try{
               
                const { userId, clientId, jobPostId } = req.body;

                if(!userId && !clientId && !jobPostId ) {
                   return res.status(400).json({ message: 'Missing informations ', success: false });
                }

                const response = await allClientUseCases.createContractUseCase.execute(clientId, userId, jobPostId); 
                
                res.status(200).json({message: 'new contract created successfully',data: response, success: true});
            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
         }

 
         
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