import { Request, Response } from 'express';
import { allClientUseCases } from '../../../helper/controllerHelper/allCtrlConnection'
import { HttpStatusCode } from "../../../helper/constants/enums";
import { StatusMessage } from "../../../helper/constants/stausMessages";
import generateTokens from '../../../utils/generateTokens';



export const clientController = {
    signupClient: async (req: Request, res: Response) => {
        try {

            const otp = await allClientUseCases.signupClientUseCase.execute(req.body);
            if (otp) {
                res.status(HttpStatusCode.CREATED)
                    .json({ message: StatusMessage[HttpStatusCode.CREATED], data: req.body, otp, success: true });

            }
        } catch (err: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false });
        }
    },


    verifyOtp: async (req: Request, res: Response) => {
        try {

            const client = await allClientUseCases.verifyClientUseCase.execute(req.body);
            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], success: true })

        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false })
        }
    },


    //From here fix status

    resendOtp: async (req: Request, res: Response) => {
        try {

            const client = await allClientUseCases.signupClientUseCase.execute(req.body);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], newOtp: client, success: true });

        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false });
        }
    },


    verifyEmail: async (req: Request, res: Response) => {
        try {
            const response = await allClientUseCases.verifyEmailClientUseCase.execute(req.body.email);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true })
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false });
        }
    },


    resetPassword: async (req: Request, res: Response) => {
        try {
            const { clientId } = req.params;
            const { password } = req.body;
            const response = await allClientUseCases.resetPasswordClientUseCase.execute(clientId, password);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false });
        }
    },


    loginClient: async (req: Request, res: any) => {
        try {

 
            const client: any = await allClientUseCases.loginClientUseCase.execute(req.body);

 
            const { accessToken, refreshToken } = generateTokens(client);


            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });


            if (!client) {
                res
                    .status(HttpStatusCode.NOT_FOUND)
                    .json({ message: StatusMessage[HttpStatusCode.NOT_FOUND], sucess: false })
            } else {
                res.status(HttpStatusCode.OK).json({
                    message: StatusMessage[HttpStatusCode.OK],
                    client,
                    accessToken,
                    refreshToken,
                    success: true,
                });



            }
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false });
        }
    },









    allUser: async (req: Request, res: Response) => {
        try {

            const response = await allClientUseCases.allUserUseCase.execute();
            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false });
        }
    },










    googleLogin: async (req: Request, res: Response) => {
        try {

            const client = await allClientUseCases.GoogleLoginClientUseCase.execute(req.body);
            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false });
        }
    },


    getHomeClient: async (req: any, res: any) => {
        try {

            const users = await allClientUseCases.getHomeClientUseCase.execute();
            res.cookie("jwtC", req.client.accessToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            }
            );
            return res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: users, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false })
        }
    },


    getProfile: async (req: Request, res: Response) => {
        try {
            const { clientId } = req.params;

            const client = await allClientUseCases.getClientProfileUseCase.execute(clientId);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: client, success: true });

        } catch (err: any) {
            res.json({ message: err.messge, sucess: false });
        }
    },


    profileVerification: async (req: Request, res: Response) => {
        try {

            const { clientId } = req.params;

            const response = await allClientUseCases.profileVerificationUseCase.execute(clientId, req.body);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },


    editProfile: async (req: Request, res: Response) => {
        try {


            const { clientId } = req.params;
            const response = await allClientUseCases.editClientProfileUseCase.execute(clientId, req.body);

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: StatusMessage[HttpStatusCode.CREATED], success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },


    logoutClient: async (req: Request, res: Response) => {

        try {
            res.clearCookie("jwtC", { path: '/' });
            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], success: true });

        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false })
        }
    },


    createJobPost: async (req: Request, res: Response) => {
        try {
            const { clientId } = req.params;

            const { data } = req.body;

            const jobPost = await allClientUseCases.createJobPostUseCase.execute(clientId, data);

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: StatusMessage[HttpStatusCode.CREATED], data: jobPost, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false })
        }
    },


    getAllNotifications: async (req: Request, res: Response) => {
        try {

            const { clientId } = req.params;
            const response = await allClientUseCases.getAllNotificationsUseCase.execute(clientId);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], notifications: response, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], sucess: false })
        }
    },


    listAllJobs: async (req: Request, res: Response) => {
        try {
            const response = await allClientUseCases.listAllJobsClientUseCase.execute();

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false })
        }
    },


    makePayment: async (req: Request, res: Response) => {
        try {
            const { clientId } = req.params;
            const response = await allClientUseCases.makePaymentUseCase.execute(clientId, req.body);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], response, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },



    getUserProfile: async (req: Request, res: Response) => {
        try {

            const { userId } = req.params;
            const response = await allClientUseCases.getUserProfileUseCase.execute(userId);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], response, success: true });
        } catch (err: any) {
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false })
        }
    },


    getProposals: async (req: Request, res: Response) => {
        try {
            const { clientId } = req.params;
            const response = await allClientUseCases.getProposalsUseCase.execute(clientId);

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },

    getMyJobs: async (req: Request, res: Response) => {
        try {
            const { clientId } = req.params;
            const response = await allClientUseCases.getMyJobsUseCase.execute(clientId);

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },

    latestJobs: async (req: Request, res: Response) => {
        try {

            const response = await allClientUseCases.latestJobsUseCase.execute();

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },

    createContract: async (req: Request, res: any) => {
        try {

            const { userId, clientId, jobPostId, bidAmount, bidDeadline } = req.body;

            if (!userId && !clientId && !jobPostId) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Missing informations ', success: false });
            }

            const response = await allClientUseCases.createContractUseCase.execute(clientId, userId, jobPostId, bidAmount, bidDeadline);

            res.status(HttpStatusCode.CREATED)
                .json({ message: StatusMessage[HttpStatusCode.CREATED], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },


    rejectProposal: async (req: Request, res: any) => {
        try {
          
            const { userId, clientId, jobPostId } = req.body;

            if (!userId && !clientId && !jobPostId) {
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Missing informations ', success: false });
            }

            const response = await allClientUseCases.rejectProposalUseCase.execute(clientId, userId, jobPostId);

            res.status(HttpStatusCode.CREATED)
                .json({ message: StatusMessage[HttpStatusCode.CREATED], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    },



    myContracts: async (req: Request, res: Response) => {
        try {

            const { clientId } = req.params;
            const response = await allClientUseCases.myContractsUseCase.execute(clientId);

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },



    viewContract: async (req: Request, res: Response) => {
        try {

            const { contractId } = req.params;
            const response = await allClientUseCases.viewContractUseCase.execute(contractId);

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], contract: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },



    viewSubmissions: async (req: Request, res: Response) => {
        try {

            const { clientId } = req.params;
            const response = await allClientUseCases.viewSubmissionsUseCase.execute(clientId);

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },




    closeContract: async (req: Request, res: Response) => {
        try {

            const { contractId } = req.params;
            const response = await allClientUseCases.closeContractUseCase.execute(contractId);

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },


    rateUser: async (req: Request, res: Response) => {
        try {
            const { notificationId } = req.params;
            const { userId, rating } = req.body.body;
            console.log('DATA FROM ctrl ', notificationId, req.body.body)
            const response = await allClientUseCases.rateUserUseCase.execute(notificationId, userId, rating);

            res.status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },


    createChat: async (req: Request, res: Response) => {
        try {

            const response = await allClientUseCases.createChatUseCase.execute(req.body);

            res.status(HttpStatusCode.CREATED)
                .json({ message: StatusMessage[HttpStatusCode.CREATED], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },



    sendMessage: async (req: Request, res: Response) => {
        try {

            const response = await allClientUseCases.sendMessageUseCase.execute(req.body);

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: StatusMessage[HttpStatusCode.CREATED], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },


    getAllChats: async (req: Request, res: Response) => {
        try {
            const { memberId } = req.params;
            const response = await allClientUseCases.getAllChatsUseCase.execute(memberId);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], data: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },

    viewChat: async (req: Request, res: Response) => {
        try {
            const { roleId , targetId, roleName } = req.params;
            const response = await allClientUseCases.viewChatUseCase.execute(roleId, targetId, roleName);

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], messages: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
        }
    },



    getallDevelopers: async (req: Request, res: Response) => {
        try {

            const response = await allClientUseCases.getallDevelopersUseCase.execute();

            res
                .status(HttpStatusCode.OK)
                .json({ message: StatusMessage[HttpStatusCode.OK], developers: response, success: true });
        } catch (err: any) {
            res.status(500)
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR], success: false });
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