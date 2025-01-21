import { Request, Response } from 'express';
import {
    allUserUseCases
} from '../../../helper/controllerHelper/allCtrlConnection';


export const userController = {

    signupUser: async (req: Request, res: Response) => {
        try { 
            const otp = await allUserUseCases.signupUseCase.execute(req.body);

            if (otp) {
                res
                    .status(201)
                    .json({
                        message: "Registration successed",
                        data: req.body,
                        otp,
                        type: "success",
                    });
            }
        } catch (err: any) {
            res.status(400).json({ message: err.message, type: "error" });
        }
    },

    
    verifyOtp: async (req: Request, res: Response) => {
        try { 
            const user = await allUserUseCases.verifyUserUseCase.execute(req.body);
            res.json({ message: "OTP verified successfully ", type: "success" });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    resendOtp: async (req: Request, res: Response) => {
        try {
            const user = await allUserUseCases.signupUseCase.execute(req.body);

            res.json({
                message: "OTP resend successfully",
                newOtp: user,
                type: "success",
            });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    verifyEmail: async (req: Request, res: Response) => {
        try {
            const response = await allUserUseCases.verifyEmailUseCase.execute(req.body.email);

            res.json({
                message: "successfully sended",
                data: response,
                type: "success",
            });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    resetPassword: async (req: Request, res: Response) => {
        try {  
            let { userId } = req.params, { password } = req.body; 
            const response = await allUserUseCases.resetPasswordUseCase.execute(userId, password);

            res.json({ message: "Password Reset Successfully", type: "success" });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    loginUser: async (req: Request, res: any) => {
        try {
            const theUser = await allUserUseCases.loginUseCase.execute(req.body);

            const { user, refreshToken, accessToken} = theUser;
       

            res.cookie("jwtU", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",  
                sameSite: "strict", 
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            
                          res.cookie("accessTokenU", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
        
            return res.status(200).json({ message: "Login successful", user, accessToken, type: "success" });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    googleLogin: async (req: Request, res: any) => {
        try {
            const user = await allUserUseCases.GoogleLoginUserUseCase.execute(req.body); 
            res.cookie("jwtU", user.jwt, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            }); 
            res.json({ message: "successfully login",user: user,  success: true });
        } catch (err: any) {
            res.json({ message: err.message, success: false});
        }
    },


    getHomeUser: async (req: Request, res: any) => {
        try {
      
            const clients = await allUserUseCases.getHomeUseCase.execute();

          
            return res.json({
                message: "successfully login",
                data: clients,
                type: "success",
            });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    getProfile: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            console.log('THE PARMA S; ',userId)
            const user = await allUserUseCases.getProfileUseCase.execute(userId);
            console.log('THE RESPONSE : ', user)

            res.json({
                message: "successfully loaded user data",
                data: user,
                type: "success",
            });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    editProfile: async (req: Request, res: Response) => {

        try {
            const { userId } = req.params;
            const profileData = req.body; 
            console.log('THE EXPOERIN: ', req.body.editData)
      
            const response = await allUserUseCases.editProfileUseCase.execute(userId, profileData);

            res.json({ message: "Profile successfully edited", type: "success" });
        } catch (err: any) {
         
            res.json({ message: err.message, type: "error" });
        }
    },


    logoutUser: async (req: Request, res: Response) => {
        try {
            res.clearCookie("jwtU", { path: "/" });
            res.json({ message: "successfully loggedout", type: "success" });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    
    listAllJobs: async (req: Request, res: Response) => {
        try{
            
           const response = await allUserUseCases.listAllJobsUseCase.execute(); 

           res.json({message: 'successfully list all jobs',data: response, success: true}); 
        }catch(err: any) {
            res.json({message: err.message, success: false})
        }
    },

    
    bestMatches: async (req: Request, res: Response) => {
        try{
            const { userId } = req.params;
           const response = await allUserUseCases.bestMatchesUseCase.execute(userId); 

           res.json({message: 'successfully list all notifications',data: response, success: true}); 
        }catch(err: any) {
            res.json({message: err.message, success: false})
        }
    },

    
    createProposal: async (req: Request, res: Response) => {
        try{ 
    
            const {userId, jobPostId, description, bidAmount, bidDeadline} = req.body.body;
            
           const response = await allUserUseCases.createProposalUseCase.execute(userId, jobPostId, description, bidAmount, bidDeadline); 

           res.json({message: 'proposal successfully send ',data: response, success: true}); 
        }catch(err: any) {
            res.json({message: err.message, success: false})
        }
    },

    
    
    allContracts: async (req: Request, res: Response) => {
        try{
            const { userId } = req.params;
            
            const allContracts = await allUserUseCases.allContractsUseCase.execute(userId);

          

            res.status(200).json({message: 'successfully closed the contract',contracts: allContracts, success: true});
        }catch(err: any) {
            res.status(500).json({message: err.message, success: false});
        }
    },

    
 
    allNotifications: async (req: Request, res: Response) => {
        try{
              const { userId } = req.params;
            
            const allNotifications = await allUserUseCases.allNotificationsUseCase.execute(userId);
   
            res.status(200).json({message: 'successfully loaded all notifications',notifications: allNotifications, success: true});
        }catch(err: any) {
            res.status(500).json({message: err.message, success: false});
        }
    },



    
        closingContract: async (req: Request, res: Response) => {
            try{
                  const { contractId, description, progress } = req.body;
            
                   
                const closedContract = await allUserUseCases.closeContractUseCase.execute(contractId, description, progress);
                console.log('CLOSED CONTRCAT SUCCESS!')
    
                res.status(200).json({message: 'Contract closed successfully', success: true});
            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
        },


    
        boostAccount: async (req: Request, res: Response) => {
            try{
                  const { userId } = req.params;
            
                   
                const paymentUrl = await allUserUseCases.boostAccountUseCase.execute(userId);
    
                res.status(200).json({message: 'successfully closed the contract',url: paymentUrl, success: true});
            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
        },

    
        bosstSuccess: async (req: Request, res: Response) => {
            try{
                  const { userId } = req.params;
             
                const response = await allUserUseCases.boostSuccessUseCase.execute(userId);
    
                res.status(200).json({message: 'successfully closed the contract',response: response, success: true});
            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
        },

        getSingleJobPost: async (req: Request, res: Response) => {
            try{
                const { jobPostId } = req.params;

                const jobPost = await allUserUseCases.getSingleJobPostUseCase.execute(jobPostId); 

                res.status(200).json({ message: "job post loaded successfully ", jobPost, success: true });

            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
        } ,

        viewMyContracts: async (req: Request, res: Response) => {
            try{
                const { userId } = req.params; 
                const contracts = await allUserUseCases.viewMyContractsUseCase.execute(userId); 
                 res.status(200).json({ message: "contracts loaded successfully ", data: contracts, success: true });

            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
        },



        submitProject: async (req: Request, res: Response) => {
            try{
                const { contractId } = req.params;

                const response = await allUserUseCases.submitProjectUseCase.execute(contractId, req.body); 
                 

                res.status(200).json({ message: "Project submitted successfully ", data: response, success: true });

            }catch(err: any) {
                res.status(500).json({message: err.message, success: false});
            }
        }
};

 