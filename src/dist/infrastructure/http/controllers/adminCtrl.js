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
exports.adminController = void 0;
const allCtrlConnection_1 = require("../../../helper/controllerHelper/allCtrlConnection");
const enums_1 = require("../../../helper/constants/enums");
const stausMessages_1 = require("../../../helper/constants/stausMessages");
const generateTokens_1 = __importDefault(require("../../../utils/generateTokens"));
const logger_1 = __importDefault(require("../../../logger/logger"));
exports.adminController = {
    // signUpAdmin: async(req: Request, res: Response): Promise<void> => {
    //     try{
    //         const adminId: string = '676bfa326c2e4c9fc3afba8e'
    //         const users = await allAdminUseCases.create.execute(adminId);
    //         res.json({message: "Successfully fetched all the users", data: users, success: true});
    //     }catch(err) {
    //         res.json({message: StatusMessage[HttpStatusCode.INTERNAL_SERVER_ERROR] , success: false});
    //     }
    // },
    loginAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield allCtrlConnection_1.allAdminUseCases.loginAdminUseCase.execute(req.body);
            if (!admin)
                throw new Error('admin not exists');
            admin.role = "admin";
            const { accessToken, refreshToken } = (0, generateTokens_1.default)(admin);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                admin,
                accessToken,
                refreshToken,
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
    getDashboard: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const clientMetrics = yield allCtrlConnection_1.allAdminUseCases.clientMetricsUseCase.execute();
            const userMetrics = yield allCtrlConnection_1.allAdminUseCases.userMetricsUseCase.execute();
            const { range } = req.params;
            const getRevenue = yield allCtrlConnection_1.allAdminUseCases.getRevenueUseCase.execute(range);
            const response = {
                clientMetrics: clientMetrics,
                userMetrics: userMetrics,
                getRevenue: getRevenue
            };
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
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('fom u', req.query);
            const page = Number(req.query.page);
            const sortType = String(req.query.sortType || "asc");
            const users = yield allCtrlConnection_1.allAdminUseCases.getAllUsersUseCase.execute(page, sortType);
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
    getAllClients: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('from C: ', req.query);
            const page = Number(req.query.page);
            const sortType = String(req.query.sortType);
            const clients = yield allCtrlConnection_1.allAdminUseCases.getAllClientsUseCase.execute(page, sortType);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                data: clients,
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
    blockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const user = yield allCtrlConnection_1.allAdminUseCases.blockUserUseCase.execute(userId);
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
    unBlockUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const user = yield allCtrlConnection_1.allAdminUseCases.unBlockUserUseCase.execute(userId);
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
    blockClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { clientId } = req.params;
            const client = yield allCtrlConnection_1.allAdminUseCases.blockClientUseCase.execute(clientId);
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
    unBlockClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { clientId } = req.params;
            const client = yield allCtrlConnection_1.allAdminUseCases.unBlockClientUseCase.execute(clientId);
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
    viewWallet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentPage = Number(req.query.currentPage) || 1;
            const wallet = yield allCtrlConnection_1.allAdminUseCases.viewWalletAdminUseCase.execute(currentPage);
            res
                .status(enums_1.HttpStatusCode.OK)
                .json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                wallet,
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
    logoutAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    verifyAccept: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield allCtrlConnection_1.allAdminUseCases.verifyAcceptUseCase.execute(req.body);
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
    getRequests: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield allCtrlConnection_1.allAdminUseCases.getAllRequestsUseCase.execute();
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
    getRequestedClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { clientId } = req.params;
            const response = yield allCtrlConnection_1.allAdminUseCases.getRequestedClientUseCase.execute(clientId);
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
    viewRoleInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { roleId, roleInfo } = req.params;
            const response = yield allCtrlConnection_1.allAdminUseCases.viewRoleInfoUseCase.execute(roleId, roleInfo);
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
    getWallet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield allCtrlConnection_1.allAdminUseCases.getWalletUseCase.execute();
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
    sortUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sortingType = String(req.query.sortType);
            const response = yield allCtrlConnection_1.allAdminUseCases.sortUserUseCase.execute(sortingType);
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
    sortClient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sortingType = String(req.query.sortingType);
            const response = yield allCtrlConnection_1.allAdminUseCases.sortClientUseCase.execute(sortingType);
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
    getAllContracts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentPage = Number(req.query.currentPage);
            const contracts = yield allCtrlConnection_1.allAdminUseCases.viewContractsAdminUseCase.execute(currentPage);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                contracts,
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
    viewSingleContract: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const contractId = String(req.params.contractId);
            const contract = yield allCtrlConnection_1.allAdminUseCases.viewSingleContractAdminUseCase.execute(contractId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                contract,
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
    successMoneyTransfer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { roleType, userId, paymentScreenshot, amount, upiId, requestId, requestedAmount } = req.body.body;
            const response = yield allCtrlConnection_1.allAdminUseCases.successMoneyTransferUseCase.execute(roleType, userId, paymentScreenshot, amount, upiId, requestId);
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                response,
                success: true,
            });
        }
        catch (error) {
            const err = error;
            res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
        }
    }),
    getWithdrawRequests: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requests = yield allCtrlConnection_1.allAdminUseCases.getWithdrawRequestsUseCase.execute();
            res.status(enums_1.HttpStatusCode.OK).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                requests,
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
        try {
            const currentPage = Number(req.query.currentPage);
            const response = yield allCtrlConnection_1.allAdminUseCases.viewContractsAdminUseCase.execute(currentPage);
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
    })
};
