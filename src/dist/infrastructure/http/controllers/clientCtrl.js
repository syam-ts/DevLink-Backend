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
exports.clientController = void 0;
const allCtrlConnection_1 = require("../../../helper/controllerHelper/allCtrlConnection");
const enums_1 = require("../../../helper/constants/enums");
const stausMessages_1 = require("../../../helper/constants/stausMessages");
const generateTokens_1 = __importDefault(require("../../../utils/generateTokens"));
const logger_1 = __importDefault(require("../../../logger/logger"));
exports.clientController = {
    signupClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const otp = yield allCtrlConnection_1.allClientUseCases.signupClientUseCase.execute(req.body);
            if (otp) {
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                    data: req.body,
                    otp,
                    success: true,
                });
            }
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    verifyOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client = yield allCtrlConnection_1.allClientUseCases.verifyClientUseCase.execute(req.body);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    //From here fix status
    resendOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client = yield allCtrlConnection_1.allClientUseCases.signupClientUseCase.execute(req.body);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                newOtp: client,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    verifyEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield allCtrlConnection_1.allClientUseCases.verifyEmailClientUseCase.execute(req.body.email);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { clientId } = req.params;
            const { password } = req.body;
            const response = yield allCtrlConnection_1.allClientUseCases.resetPasswordClientUseCase.execute(clientId, password);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    loginClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client = yield allCtrlConnection_1.allClientUseCases.loginClientUseCase.execute(req.body);
            if (!client) {
                res
                    .status(401)
                    .json({ message: "Invalid credentials", success: false });
                return;
            }
            client.role = "client";
            const { accessToken, refreshToken } = (0, generateTokens_1.default)(client);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            if (!client) {
                res.status(enums_1.HttpStatusCode.NOT_FOUND).json({
                    message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.NOT_FOUND],
                    sucess: false,
                });
            }
            else {
                res.status(enums_1.HttpStatusCode.OK).json({
                    message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    client,
                    accessToken,
                    refreshToken,
                    success: true,
                });
            }
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client = yield allCtrlConnection_1.allClientUseCases.GoogleLoginClientUseCase.execute(req.body);
            if (!client) {
                res
                    .status(401)
                    .json({ message: "Invalid credentials", success: false });
                return;
            }
            client.role = "client";
            const { accessToken, refreshToken } = (0, generateTokens_1.default)(client);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                client,
                accessToken,
                refreshToken, success: true
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getHomeClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield allCtrlConnection_1.allClientUseCases.getHomeClientUseCase.execute();
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: users,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    trendingJobs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jobs = yield allCtrlConnection_1.allClientUseCases.trendingJobsUseCase.execute();
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: jobs,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
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
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const currentPage = Number(req.query.currentPage) || 1;
            const response = yield allCtrlConnection_1.allClientUseCases.getSelectedJobsClientUseCase.execute(clientId, jobsType, currentPage);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const client = yield allCtrlConnection_1.allClientUseCases.getClientProfileUseCase.execute(clientId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: client,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    profileVerification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const response = yield allCtrlConnection_1.allClientUseCases.profileVerificationUseCase.execute(clientId, req.body);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    editProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const response = yield allCtrlConnection_1.allClientUseCases.editClientProfileUseCase.execute(clientId, req.body);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    logoutClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: "/",
            });
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({ message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK], success: true });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getAllNotifications: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { clientId } = req.params;
            const response = yield allCtrlConnection_1.allClientUseCases.getAllNotificationsUseCase.execute(clientId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                notifications: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    makePayment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //  if (!req.user || !req.user.id) {
            //   return res.status(401).json({ message: "Unauthorized", success: false });
            // }
            // const clientId = String(req.user?.id);;
            const clientId = '67e268a4a9ff4accb5a24d34';
            const response = yield allCtrlConnection_1.allClientUseCases.makePaymentUseCase.execute(clientId, req.body);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    createJobPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const { data } = req.body;
            const jobPost = yield allCtrlConnection_1.allClientUseCases.createJobPostUseCase.execute(clientId, data);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                data: jobPost,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const response = yield allCtrlConnection_1.allClientUseCases.getUserProfileUseCase.execute(userId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getProposals: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const response = yield allCtrlConnection_1.allClientUseCases.getProposalsUseCase.execute(clientId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    createContract: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, clientId, jobPostId, bidAmount, bidDeadline } = req.body;
            if (!userId && !clientId && !jobPostId) {
                res
                    .status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
                    .json({ message: "Missing informations ", success: false });
            }
            const response = yield allCtrlConnection_1.allClientUseCases.createContractUseCase.execute(clientId, userId, jobPostId, bidAmount, bidDeadline);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    rejectProposal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { userId, jobPostId } = req.body;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            if (!userId && !clientId && !jobPostId) {
                res
                    .status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
                    .json({ message: "Missing informations ", success: false });
            }
            const response = yield allCtrlConnection_1.allClientUseCases.rejectProposalUseCase.execute(clientId, userId, jobPostId);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    viewContracts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const { contractViewType } = req.params;
            const currentPage = Number(req.query.currentPage) || 1;
            const contracts = yield allCtrlConnection_1.allClientUseCases.viewContractsClientUseCase.execute(clientId, contractViewType, currentPage);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: contracts,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    viewSubmissions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const response = yield allCtrlConnection_1.allClientUseCases.viewSubmissionsUseCase.execute(clientId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    closeContract: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { contractId, progress } = req.body;
            const response = yield allCtrlConnection_1.allClientUseCases.closeContractUseCase.execute(contractId, progress);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    rateAndReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const { notificationId } = req.params;
            const { userId, rating, review, } = req.body;
            const response = yield allCtrlConnection_1.allClientUseCases.rateAndReviewUserUseCase.execute(userId, clientId, notificationId, rating, review);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    sendMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield allCtrlConnection_1.allClientUseCases.sendMessageUseCase.execute(req.body);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getAllChats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { roleId } = req.params;
            const response = yield allCtrlConnection_1.allClientUseCases.getAllChatsUseCase.execute(roleId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    viewChat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { roleType, roleId, targetId, roleName } = req.params;
            const response = yield allCtrlConnection_1.allClientUseCases.viewChatUseCase.execute(roleType, roleId, targetId, roleName);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                messages: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    viewWallet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const currentPage = Number(req.query.currentPage);
            const response = yield allCtrlConnection_1.allClientUseCases.viewWalletUseCase.execute(clientId, currentPage);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                wallet: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getallDevelopers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield allCtrlConnection_1.allClientUseCases.getallDevelopersUseCase.execute();
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                developers: response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    rejectContract: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const { contractId } = req.body;
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const response = yield allCtrlConnection_1.allClientUseCases.rejectContractUseCase.execute(contractId, clientId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    listAllJobs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const response = yield allCtrlConnection_1.allClientUseCases.listAllJobsClientUseCase.execute(clientId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    inviteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { userId, selectJobId, description, } = req.body;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const response = yield allCtrlConnection_1.allClientUseCases.inviteUserUseCase.execute(userId, clientId, selectJobId, description);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    viewInvite: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            ;
            const { inviteType } = req.params;
            const invites = yield allCtrlConnection_1.allClientUseCases.viewInviteUseCase.execute(clientId, inviteType);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                invites,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    getSingleJobPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { jobPostId } = req.params;
            const jobPost = yield allCtrlConnection_1.allClientUseCases.getSingleJobPostClientUseCase.execute(jobPostId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                jobPost,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    searchDevlopers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { input } = req.body;
            const developers = yield allCtrlConnection_1.allClientUseCases.searchDeveloperUseCase.execute(input);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                developers,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
    withdrawMoneyByClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { amount, accountNumber, balance, type } = req.body;
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const clientId = String((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const response = yield allCtrlConnection_1.allClientUseCases.withdrawMoneyByClientUseCase.execute(clientId, amount, accountNumber);
            res.status(enums_1.HttpStatusCode.CREATED).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.CREATED],
                success: true,
            });
        }
        catch (error) {
            const err = error;
            logger_1.default.error(err.message);
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }),
};
