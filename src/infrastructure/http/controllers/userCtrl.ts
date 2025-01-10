import { Request, Response } from 'express';
import { SignupUser } from "../../../application/usecases/user/signupUser";
import { LoginUser } from "../../../application/usecases/user/loginUser";
import { GoogleLoginUser } from "../../../application/usecases/user/GoogleLoginUser";
import { getHomeUser } from "../../../application/usecases/user/getHomeUser";
import { LogoutUser } from "../../../application/usecases/user/logoutUser";
import { verifyOtp } from "../../../application/usecases/user/otpUser";
import { VerifyEmail } from "../../../application/usecases/user/verifyEmail";
import { ResetPassword } from "../../../application/usecases/user/resetPassword";
import { UserRepositoryMongoose } from "../../../domain/interfaces/Repositaries/UserRepositoryMongoose ";
import { EditUserProfile } from "../../../application/usecases/user/editProfile";
import { GetUserProfile } from "../../../application/usecases/user/getProfile";
import { ListAllJobs } from "../../../application/usecases/user/listAllJobs";
import { BestMatches } from "../../../application/usecases/user/bestMatches";
import { CreateProposal } from "../../../application/usecases/user/createProposal"; 
import { CloseContract } from "../../../application/usecases/user/closeContract"; 


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
const listAllJobsUseCase = new ListAllJobs(userRepository);
const bestMatchesUseCase = new BestMatches(userRepository);
const createProposalUseCase = new CreateProposal(userRepository);
const closeContractUseCase = new CloseContract(userRepository);


export const userController = {

    signupUser: async (req: Request, res: Response) => {
        try { 
            const otp = await signupUseCase.execute(req.body);

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
          
            const user = await verifyUserUseCase.execute(req.body);

            res.json({ message: "OTP verified successfully", type: "success" });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    resendOtp: async (req: Request, res: Response) => {
        try {
            const user = await signupUseCase.execute(req.body);

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
            const response = await verifyEmailUseCase.execute(req.body.email);

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
            const response = await resetPasswordUseCase.execute(userId, password);

            res.json({ message: "Password Reset Successfully", type: "success" });
        } catch (err: any) {
            res.json({ message: err.message, type: "error" });
        }
    },


    loginUser: async (req: Request, res: any) => {
        try {
            const theUser = await loginUseCase.execute(req.body);

            const { user, refreshToken, accessToken} = theUser;
            console.log('The user : ', user)

            res.cookie("jwtU", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
                sameSite: "strict", // Adjust as needed
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
            const user = await GoogleLoginUserUseCase.execute(req.body); 
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
      
            const clients = await getHomeUseCase.execute();

          
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
            const user = await getProfileUseCase.execute(userId);

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
            const response = await editProfileUseCase.execute(userId, profileData);

            res.json({ message: "Profile successfully edited", type: "success" });
        } catch (err: any) {
            console.log('ERROF: ',err)
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
            
           const response = await listAllJobsUseCase.execute(); 

           res.json({message: 'successfully list all notifications',data: response, success: true}); 
        }catch(err: any) {
            res.json({message: err.message, success: false})
        }
    },

    
    bestMatches: async (req: Request, res: Response) => {
        try{
            const { userId } = req.params;
           const response = await bestMatchesUseCase.execute(userId); 

           res.json({message: 'successfully list all notifications',data: response, success: true}); 
        }catch(err: any) {
            res.json({message: err.message, success: false})
        }
    },

    
    createProposal: async (req: Request, res: Response) => {
        try{ 
            
            const {userId, clientId}= req.params;
            const { description }= req.body; 
           const response = await createProposalUseCase.execute(clientId, userId, description); 

           res.json({message: 'successfully list all notifications',data: response, success: true}); 
        }catch(err: any) {
            res.json({message: err.message, success: false})
        }
    },


    closingContract: async (req: Request, res: Response) => {
        try{
              const { contractId, description, progress} = req.body;
              console.log('THE BODY : ', req.body);
            const closedContract = await closeContractUseCase.execute(contractId, description, progress);

            res.status(200).json({message: 'successfully closed the contract', success: true});
        }catch(err: any) {
            res.status(500).json({message: err.message, success: false});
        }
    }
};

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
