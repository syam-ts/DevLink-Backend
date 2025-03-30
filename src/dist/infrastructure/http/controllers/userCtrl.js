"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const allCtrlConnection_1 = require("../../../helper/controllerHelper/allCtrlConnection");
const enums_1 = require("../../../helper/constants/enums");
const stausMessages_1 = require("../../../helper/constants/stausMessages");
const generateTokens_1 = __importDefault(require("../../../utils/generateTokens"));
const mongoose_1 = require("mongoose");
exports.userController = {
    signupUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const otp = yield allCtrlConnection_1.allUserUseCases.signupUseCase.execute(req.body);
            if (otp) {
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                    data: req.body,
                    otp,
                    success: true,
                });
            }
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    verifyOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield allCtrlConnection_1.allUserUseCases.verifyUserUseCase.execute(req.body);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    resendOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield allCtrlConnection_1.allUserUseCases.signupUseCase.execute(req.body);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                newOtp: user,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    verifyEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield allCtrlConnection_1.allUserUseCases.verifyEmailUseCase.execute(req.body.email);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { userId } = req.params, { password } = req.body;
            const response = yield allCtrlConnection_1.allUserUseCases.resetPasswordUseCase.execute(userId, password);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield allCtrlConnection_1.allUserUseCases.loginUseCase.execute(req.body);
            if (!user) {
                res
                    .status(401)
                    .json({ message: "Invalid credentials", success: false });
                return;
            }
            user.role = "user";
            if (!user.role)
                throw new mongoose_1.Error('not eixist');
            const { accessToken, refreshToken } = (0, generateTokens_1.default)(user);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            console.log('THe user: ', user);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                user,
                accessToken,
                refreshToken,
                success: true,
            });
        }
        catch (err) {
            console.log('the err: ', err);
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield allCtrlConnection_1.allUserUseCases.GoogleLoginUserUseCase.execute(req.body);
            if (!user) {
                res
                    .status(401)
                    .json({ message: "Invalid credentials", success: false });
                return;
            }
            user.role = "user";
            const { accessToken, refreshToken } = (0, generateTokens_1.default)(user);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                user,
                accessToken,
                refreshToken,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    getHomeUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const clients = yield allCtrlConnection_1.allUserUseCases.getHomeUseCase.execute();
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: clients,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const user = yield allCtrlConnection_1.allUserUseCases.getProfileUseCase.execute(userId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: user,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    alterProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { type } = req.params;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const profileData = req.body;
            const response = yield allCtrlConnection_1.allUserUseCases.alterProfileUseCase.execute(userId, profileData, type);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    logoutUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                path: "/",
            });
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    listHomeJobs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { type } = req.params;
            const response = yield allCtrlConnection_1.allUserUseCases.listHomeJobsUseCase.execute(type);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    getSelectedJobs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { jobsType } = req.params;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const currentPage = Number(req.query.currentPage) || 1;
            const query = {
                amount: Number(req.query.amount) || 0,
                paymentType: req.query.paymentType,
                expertLevel: req.query.expertLevel,
            };
            const response = yield allCtrlConnection_1.allUserUseCases.getSelectedJobsUseCase.execute(userId, jobsType, query, currentPage);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    createProposal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, jobPostId, description, bidAmount, bidDeadline } = req.body.body;
            const response = yield allCtrlConnection_1.allUserUseCases.createProposalUseCase.execute(userId, jobPostId, description, bidAmount, bidDeadline);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                data: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    viewProposals: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const response = yield allCtrlConnection_1.allUserUseCases.viewProposalsUseCase.execute(userId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                proposals: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    allNotifications: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const allNotifications = yield allCtrlConnection_1.allUserUseCases.allNotificationsUseCase.execute(userId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                notifications: allNotifications,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    // closingContract: async (req: Request, res: Response): Promise<void> => {
    //     try{
    //           const { contractId, description, progress } = req.body;
    //         const closedContract = await allUserUseCases.closeContractUseCase.execute(contractId, description, progress);
    //         res.status(HttpStatusCode.OK).json({message: 'Contract closed successfully', success: true});
    //     }catch(err) {
    //         res.status(500).json({message: err.message, success: false});
    //     }
    // },
    boostAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const paymentUrl = yield allCtrlConnection_1.allUserUseCases.boostAccountUseCase.execute();
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                url: paymentUrl,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    bosstSuccess: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const response = yield allCtrlConnection_1.allUserUseCases.boostSuccessUseCase.execute(userId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                response: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    getSingleJobPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { jobPostId } = req.params;
            const jobPost = yield allCtrlConnection_1.allUserUseCases.getSingleJobPostUseCase.execute(jobPostId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                jobPost,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    viewContracts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const { contractViewType } = req.params;
            const currentPage = Number(req.query.currentPage) || 1;
            const contracts = yield allCtrlConnection_1.allUserUseCases.viewContractsUseCase.execute(userId, contractViewType, currentPage);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: contracts,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    submitProject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { contractId } = req.params;
            const body = req.body.formData;
            const response = yield allCtrlConnection_1.allUserUseCases.submitProjectUseCase.execute(contractId, body);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    chatbot: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userInput } = req.body;
            const response = yield allCtrlConnection_1.allUserUseCases.chatBotUseCase.execute(userInput);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                queryResult: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    addToWishlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { jobPostId } = req.body;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const response = yield allCtrlConnection_1.allUserUseCases.addToWishlistUseCase.execute(userId, jobPostId);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    viewAllWishlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const wishlist = yield allCtrlConnection_1.allUserUseCases.viewAllWishlistUseCase.execute(userId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                wishlist,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    removeFromWishlist: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { wishlistId } = req.params;
            const { jobPostId } = req.body;
            const wishlist = yield allCtrlConnection_1.allUserUseCases.removeFromWishlistUseCase.execute(wishlistId, jobPostId);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    viewWalletUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const currentPage = Number(req.query.currentPage);
            const response = yield allCtrlConnection_1.allUserUseCases.viewWalletUserUseCase.execute(userId, currentPage);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                wallet: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    viewSingleContract: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { contractId } = req.params;
            const contract = yield allCtrlConnection_1.allUserUseCases.viewSingleContractUserUseCase.execute(contractId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                contract,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    getAllInvites: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const response = yield allCtrlConnection_1.allUserUseCases.getAllInvitesUseCase.execute(userId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                invites: response,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    rejectInvite: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { inviteId } = req.params;
            const response = yield allCtrlConnection_1.allUserUseCases.rejectInviteUseCase.execute(inviteId);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    searchJobs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { input } = req.body;
            const jobs = yield allCtrlConnection_1.allUserUseCases.searchJobsUseCase.execute(input);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                jobs,
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
    withdrawMoneyByUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { amount, accountNumber, balance, type } = req.body;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const response = yield allCtrlConnection_1.allUserUseCases.withdrawMoneyByUserUseCase.execute(userId, amount, accountNumber, balance, type);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                success: true,
            });
        }
        catch (err) {
            if (err instanceof mongoose_1.Error) {
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
            }
            return;
        }
    }),
};
