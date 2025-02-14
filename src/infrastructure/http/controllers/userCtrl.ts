import { Request, Response } from "express";
import { allClientUseCases, allUserUseCases } from "../../../helper/controllerHelper/allCtrlConnection";
import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from '../../../utils/generateTokens';
 

 
  
  

export const userController = {
    signupUser: async (req: Request, res: Response) => {
        try {
            const otp = await allUserUseCases.signupUseCase.execute(req.body);

            if (otp) {
                res.status(HttpStatusCode.CREATED).json({
                    message: StatusMessage[HttpStatusCode.CREATED],
                    data: req.body,
                    otp,
                    success: true,
                });
            }
        } catch (err: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
        }
    },


    verifyOtp: async (req: Request, res: Response) => {
        try {
            const user = await allUserUseCases.verifyUserUseCase.execute(req.body);
            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                success: true,
            });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({
                    message: err.message,
                    success: false,
                });
        }
    },


    resendOtp: async (req: Request, res: Response) => {
        try {
            const user = await allUserUseCases.signupUseCase.execute(req.body);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                newOtp: user,
                success: true,
            });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({
                    message: err.message,
                    success: false,
                });
        }
    },


    verifyEmail: async (req: Request, res: Response) => {
        try {
            const response = await allUserUseCases.verifyEmailUseCase.execute(
                req.body.email
            );

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                data: response,
                type: true,
            });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, sucess: false });
        }
    },


    resetPassword: async (req: Request, res: Response) => {
        try {
            let { userId } = req.params,
                { password } = req.body;
            const response = await allUserUseCases.resetPasswordUseCase.execute(
                userId,
                password
            );

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], type: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, sucess: false });
        }
    },

    loginUser: async (req: Request, res: any) => {
        try {

            const { user } = await allUserUseCases.loginUseCase.execute(req.body);
            console.log(user)

            if (!user) {
                res.status(401).json({ message: "Invalid credentials", success: false });
                return;
            }
            user.role = "user";
            const { accessToken, refreshToken } = generateTokens(user);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                user,
                accessToken,
                refreshToken,
                success: true,
            });
        } catch (err: any) {

            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    googleLogin: async (req: Request, res: any) => {
        try {
            const user = await allUserUseCases.GoogleLoginUserUseCase.execute(
                req.body
            );
            res.cookie("jwtU", user.jwt, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], user: user, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    getHomeUser: async (req: Request, res: any) => {
        try {
            console.log('Reach here so far')

            const clients = await allUserUseCases.getHomeUseCase.execute();

            return res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                data: clients,
                type: true,
            });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, sucess: false });
        }
    },


    getProfile: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const user = await allUserUseCases.getProfileUseCase.execute(userId);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                data: user,
                type: true,
            });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, sucess: false });
        }
    },


    editProfile: async (req: Request, res: Response) => {
        try {
            const { userId, type } = req.params;
            const profileData = req.body;


            const response = await allUserUseCases.editProfileUseCase.execute(
                userId,
                profileData,
                type
            );

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    data: response,
                    sucess: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, sucess: false });
        }
    },


    logoutUser: async (req: Request, res: Response) => {
        try {
            res.clearCookie("refreshToken",
                 { 
                    httpOnly: true, 
                      sameSite: 'strict',
                      secure: process.env.NODE_ENV === 'production',
                      path: "/"
                     }
                );
            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], type: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, sucess: false });
        }
    },





    allClients: async (req: Request, res: Response) => {
        try {
            const result = await allUserUseCases.allClientsUseCase.execute()
            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: result, type: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, sucess: false });
        }
    },



    listHomeJobs: async (req: Request, res: Response) => {
        try {
            const { type } = req.params;
            const response = await allUserUseCases.listHomeJobsUseCase.execute(type);

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    data: response,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    getSelectedJobs: async (req: Request, res: Response) => {
        try {
            const { userId, jobType } = req.params;
            const response = await allUserUseCases.getSelectedJobsUseCase.execute(
                userId,
                jobType
            );
            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    data: response,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    createProposal: async (req: Request, res: Response) => {
        try {

            const { userId, jobPostId, description, bidAmount, bidDeadline } = req.body.body;
            const response = await allUserUseCases.createProposalUseCase.execute(
                userId,
                jobPostId,
                description,
                bidAmount,
                bidDeadline
            );



            res
                .status(HttpStatusCode.CREATED)
                .json({
                    message: StatusMessage[HttpStatusCode.CREATED],
                    data: response,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    getAllProposals: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const response = await allUserUseCases.getAllProposalsUseCase.execute(
                userId
            );

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    proposals: response,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    allContracts: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const allContracts = await allUserUseCases.allContractsUseCase.execute(
                userId
            );

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    contracts: allContracts,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    allNotifications: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const allNotifications =
                await allUserUseCases.allNotificationsUseCase.execute(userId);

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    notifications: allNotifications,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },

    // closingContract: async (req: Request, res: Response) => {
    //     try{
    //           const { contractId, description, progress } = req.body;

    //         const closedContract = await allUserUseCases.closeContractUseCase.execute(contractId, description, progress);

    //         res.status(HttpStatusCode.OK).json({message: 'Contract closed successfully', success: true});
    //     }catch(err: any) {
    //         res.status(500).json({message: err.message, success: false});
    //     }
    // },


    boostAccount: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;

            const paymentUrl = await allUserUseCases.boostAccountUseCase.execute(
                userId
            );

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    url: paymentUrl,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    bosstSuccess: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const response = await allUserUseCases.boostSuccessUseCase.execute(
                userId
            );

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    response: response,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    getSingleJobPost: async (req: Request, res: Response) => {
        try {

            const { jobPostId } = req.params;
            const jobPost = await allUserUseCases.getSingleJobPostUseCase.execute(
                jobPostId
            );

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    jobPost,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    viewMyContracts: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const contracts = await allUserUseCases.viewMyContractsUseCase.execute(
                userId
            );
            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    data: contracts,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    viewSubmittedContracts: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const contracts =
                await allUserUseCases.viewSubmittedContractsUseCase.execute(userId);
            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    data: contracts,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    submitProject: async (req: Request, res: Response) => {
        try {
            const { contractId } = req.params;
            const body = req.body.formData;
            const response = await allUserUseCases.submitProjectUseCase.execute(
                contractId,
                body
            );

            res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    data: response,
                    success: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },

    chatbot: async (req: Request, res: any) => {
        try {
            const { userInput } = req.body;

            const response = await allUserUseCases.chatBotUseCase.execute(userInput);

            return res
                .status(HttpStatusCode.OK)
                .json({
                    message: StatusMessage[HttpStatusCode.OK],
                    queryResult: response,
                    type: true,
                });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },


    addUserToWishlist: async (req: Request, res: any) => {
        try {
            const { userId, jobPostId } = req.body;
            const response = await allUserUseCases.addToWishlistUseCase.execute(
                userId,
                jobPostId
            );

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: StatusMessage[HttpStatusCode.CREATED], success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },
    viewWalletUser: async (req: Request, res: Response) => {
        try {
            const { userId, currentPage } = req.params;
            const response = await allUserUseCases.viewWalletUserUseCase.execute(userId, parseInt(currentPage));

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], wallet: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },
};


