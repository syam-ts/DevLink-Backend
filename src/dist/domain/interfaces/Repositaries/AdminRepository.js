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
exports.AdminRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../../entities/User");
const Notification_1 = require("../../entities/Notification");
const Client_1 = require("../../entities/Client");
const Admin_1 = require("../../entities/Admin");
const Contract_1 = require("../../entities/Contract");
class AdminRepository {
    findAdmin(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name !== process.env.ADMIN_USERNAME) {
                throw new Error("Username is incorrect");
            }
            if (password !== process.env.ADMIN_PASSWORD) {
                throw new Error("Password is incorrect");
            }
            return { _id: process.env.ADMIN_OBJECT_ID };
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.UserModel.find().lean().exec();
            if (!users || users.length === 0) {
                throw new Error("Users not found");
            }
            return users;
        });
    }
    getAllUsers(page, sortType) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 5;
            const skip = (page - 1) * PAGE_SIZE;
            const totalUsers = yield User_1.UserModel.countDocuments({});
            const totalPages = Math.ceil(totalUsers / PAGE_SIZE);
            let users;
            if (sortType === "latest") {
                users = yield User_1.UserModel.aggregate([
                    { $match: { isProfileFilled: true } },
                    { $sort: { createdAt: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
            }
            else if (sortType === "block") {
                users = yield User_1.UserModel.aggregate([
                    { $match: { isProfileFilled: true } },
                    { $sort: { isBlocked: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
            }
            else if (sortType === "unBlock") {
                users = yield User_1.UserModel.aggregate([
                    { $match: { isProfileFilled: true } },
                    { $sort: { isBlocked: -1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
            }
            else {
                throw new Error("Wrong selection");
            }
            if (!users)
                throw new Error("Users not found");
            return {
                users,
                totalPages,
            };
        });
    }
    getAllClients(page, sortType) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 5;
            const skip = (page - 1) * PAGE_SIZE;
            const totalClients = yield Client_1.ClientModel.countDocuments({});
            const totalPages = Math.floor(totalClients / PAGE_SIZE);
            let clients;
            if (sortType === "latest") {
                clients = yield Client_1.ClientModel.aggregate([
                    { $match: { isVerified: true } },
                    { $sort: { createdAt: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
            }
            else if (sortType === "block") {
                clients = yield Client_1.ClientModel.aggregate([
                    { $match: { isVerified: true } },
                    { $sort: { isBlocked: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
            }
            else if (sortType === "unBlock") {
                clients = yield Client_1.ClientModel.aggregate([
                    { $match: { isVerified: true } },
                    { $sort: { isBlocked: -1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
            }
            else {
                throw new Error("Wrong selection");
            }
            if (!clients)
                throw new Error("Clients not found");
            return {
                clients,
                totalPages,
            };
        });
    }
    viewWallet(currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_size = 4;
            const skip = (currentPage - 1) * page_size;
            const adminId = process.env.ADMIN_OBJECT_ID;
            const wallet = yield Admin_1.AdminModel.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(adminId) } },
                { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
            ]);
            const totalTransactions = wallet.length > 0 ? wallet[0].totalTransactions : 0;
            const totalPages = Math.ceil(totalTransactions / page_size);
            const adminWallet = yield Admin_1.AdminModel.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(adminId) } },
                {
                    $project: {
                        transactions: {
                            $slice: ["$wallet.transactions", skip, page_size],
                        },
                        balance: "$wallet.balance",
                        _id: 0,
                    },
                },
            ]);
            return {
                adminWallet,
                totalPages,
            };
        });
    }
    sortUser(sortingType) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = 1;
            const PAGE_SIZE = 3;
            const skip = (page - 1) * PAGE_SIZE;
            const totalUsers = yield User_1.UserModel.countDocuments({});
            let users;
            if (sortingType === "blocked") {
                users = yield User_1.UserModel.aggregate([
                    { $match: {} },
                    { $sort: { isBlocked: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
                const totalPages = Math.floor(totalUsers / PAGE_SIZE);
                if (!users)
                    throw new Error('Users not Found');
                if (users) {
                    return {
                        users,
                        totalPages,
                    };
                }
            }
            else if (sortingType === "unBlocked") {
                users = yield User_1.UserModel.aggregate([
                    { $match: {} },
                    { $sort: { isBlocked: -1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
                const totalPages = Math.floor(totalUsers / PAGE_SIZE);
                if (!users)
                    throw new Error('Users not Found');
                if (users) {
                    return {
                        users,
                        totalPages,
                    };
                }
            }
            else if (sortingType === "latest") {
                users = yield User_1.UserModel.aggregate([
                    { $match: {} },
                    { $sort: { createdAt: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
                const totalPages = Math.floor(totalUsers / PAGE_SIZE);
                if (!users)
                    throw new Error('Users not Found');
                if (users) {
                    return {
                        users,
                        totalPages,
                    };
                }
            }
            else {
                throw new Error("Invalid sorting type");
            }
            const totalPages = Math.floor(totalUsers / PAGE_SIZE);
            if (!users)
                throw new Error("Users not found");
            return {
                users,
                totalPages
            };
        });
    }
    sortClients(sortingType) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = 1;
            const PAGE_SIZE = 3;
            const skip = (page - 1) * PAGE_SIZE;
            const totalClients = yield Client_1.ClientModel.countDocuments({});
            let clients;
            if (sortingType === "block") {
                clients = yield Client_1.ClientModel.aggregate([
                    { $match: {} },
                    { $sort: { isBlocked: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
                const totalPages = Math.floor(totalClients / PAGE_SIZE);
                if (clients) {
                    return {
                        clients,
                        totalPages,
                    };
                }
            }
            else if (sortingType === "unBlock") {
                clients = yield Client_1.ClientModel.aggregate([
                    { $match: {} },
                    { $sort: { isBlocked: -1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
                const totalPages = Math.floor(totalClients / PAGE_SIZE);
                if (clients) {
                    return {
                        clients,
                        totalPages,
                    };
                }
            }
            else if (sortingType === "latest") {
                clients = yield Client_1.ClientModel.aggregate([
                    { $match: {} },
                    { $sort: { createdAt: 1 } },
                    { $skip: skip },
                    { $limit: PAGE_SIZE },
                ]);
                const totalPages = Math.floor(totalClients / PAGE_SIZE);
                if (clients) {
                    return {
                        clients,
                        totalPages,
                    };
                }
            }
            else {
                throw new Error("Clients not Found");
            }
            const totalPages = Math.floor(totalClients / PAGE_SIZE);
            if (!clients)
                throw new Error('Clients not found');
            return {
                clients,
                totalPages
            };
        });
    }
    findAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield Client_1.ClientModel.find().lean().exec();
            if (!clients || clients.length === 0)
                throw new Error("Clients not found");
            return clients;
        });
    }
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true }).lean().exec();
            if (!user)
                throw new Error("User not Found");
            return user;
        });
    }
    unBlockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findByIdAndUpdate(userId, { isBlocked: false }, { new: true }).lean().exec();
            if (!user)
                throw new Error("User not Found");
            return user;
        });
    }
    blockClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findByIdAndUpdate(clientId, { isBlocked: true }, { new: true }).lean().exec();
            if (!client)
                throw new Error("Client not Found");
            return client;
        });
    }
    unBlockClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findByIdAndUpdate(clientId, { isBlocked: false }, { new: true }).lean().exec();
            if (!client)
                throw new Error("Client not Found");
            return client;
        });
    }
    //verify client profile
    verifyAccept(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId, editData } = data;
            const adminId = process.env.ADMIN_OBJECT_ID;
            editData.isVerified = true;
            editData.isEditRequest = false;
            const client = yield Client_1.ClientModel.findByIdAndUpdate(clientId, {
                isVerified: true,
                isEditRequest: false,
            }, {
                new: true,
            });
            const result = yield Admin_1.AdminModel.updateOne({ "request.clientId": clientId }, {
                $pull: {
                    request: { clientId: clientId },
                },
            });
            let updatedClient;
            if (editData.editData) {
                updatedClient = yield Client_1.ClientModel.findByIdAndUpdate(clientId, editData.editData, {
                    new: true,
                }).exec();
            }
            else {
                updatedClient = yield Client_1.ClientModel.findByIdAndUpdate(clientId, editData, {
                    new: true,
                }).exec();
            }
            const createNotification = new Notification_1.NotificationModel({
                type: "Empty",
                message: "Your profile verified successfully",
                sender_id: process.env.ADMIN_OBJECT_ID,
                reciever_id: clientId,
            });
            const savedNotification = yield createNotification.save();
            if (!updatedClient) {
                throw new Error("Client not found");
            }
            return {
                name: savedNotification.type,
                email: savedNotification.message,
                password: savedNotification.date,
            };
        });
    }
    getAllRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = process.env.ADMIN_OBJECT_ID;
            const admin = yield Admin_1.AdminModel.findById(adminId).exec();
            if (!admin)
                throw new Error("Admin not found");
            return admin.request;
        });
    }
    findClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findById(clientId).lean().exec();
            if (!client)
                throw new Error("Client not found");
            return client;
        });
    }
    viewRoleInfo(roleId, roleInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (roleInfo === "user") {
                const user = yield User_1.UserModel.findById(roleId).exec();
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            else if ((roleInfo = "client")) {
                const client = yield Client_1.ClientModel.findById(roleId).exec();
                if (!client)
                    throw new Error("Client not found");
                return client;
            }
            else {
                return null;
            }
        });
    }
    getWallet(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield Admin_1.AdminModel.findById(adminId).exec();
            if (!admin)
                throw new Error("Wallet not found");
            return admin.wallet;
        });
    }
    getAllContracts() {
        return __awaiter(this, void 0, void 0, function* () {
            const contracts = yield Contract_1.ContractModel.find().lean().exec();
            if (!contracts)
                throw new Error("Contracts not found");
            return contracts;
        });
    }
    successMoneyTransfer(roleType, userId, paymentScreenshot, amount, upiId, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Whole data: ', roleType, userId, paymentScreenshot, amount, upiId, requestId);
            const newNotification = yield Notification_1.NotificationModel.create({
                type: "Withdraw Money",
                message: "Succesfully transfer the money to bank account",
                sender_id: process.env.ADMIN_OBJECT_ID,
                reciever_id: userId,
                withdrawData: {
                    paymentScreenshot: paymentScreenshot,
                    amount: amount,
                    upiId: upiId,
                },
                createdAt: new Date(),
            });
            newNotification.save();
            const adminId = process.env.ADMIN_OBJECT_ID;
            // Delete withdrawrequest from admin
            const deleteWithdrawRequest = yield Admin_1.AdminModel.findOneAndUpdate({ "withdrawRequest._id": requestId }, { $pull: { withdrawRequest: { _id: requestId } } }, { new: true });
            // add withdraw money to admin entity for Withdraw history
            const addWithdrawMoney = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, {
                $push: {
                    "revenue.totalWithdrawals": { amount: amount, createdAt: Date.now() },
                },
            });
            // deduct money from admin wallet 
            let walletEntryAdmin = {
                type: "debit",
                amount: amount,
                from: "admin",
                fromId: adminId,
                date: new Date(),
            };
            const updateAdminWallet = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, {
                $inc: {
                    "wallet.balance": -amount,
                },
                $push: {
                    "wallet.transactions": walletEntryAdmin,
                    "revenue.grossAmount": {
                        amount: amount,
                        createdAt: Date.now(),
                    },
                },
            }, { new: true }).exec();
            // deduct money from client wallet
            if (roleType === 'user') {
                const clientDeduction = yield User_1.UserModel.findByIdAndUpdate(userId, {
                    $inc: {
                        "wallet.balance": -amount,
                    }
                }, { new: true }).exec();
            }
            else {
                const clientDeduction = yield Client_1.ClientModel.findByIdAndUpdate(userId, {
                    $inc: {
                        "wallet.balance": -amount,
                    }
                }, { new: true }).exec();
            }
            return newNotification;
        });
    }
    getWithdrawRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = process.env.ADMIN_OBJECT_ID;
            const adminData = yield Admin_1.AdminModel.findById(adminId);
            if (!adminData)
                throw new Error("Admin not found");
            return adminData.withdrawRequest;
        });
    }
    viewContracts(currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_size = 4;
            const skip = (currentPage - 1) * page_size;
            const totalContracts = yield Contract_1.ContractModel.countDocuments();
            const contracts = yield Contract_1.ContractModel.find().skip(skip).limit(page_size);
            const totalPages = Math.ceil(totalContracts / page_size);
            if (!contracts)
                throw new Error("Contracts not found");
            return { contracts, totalPages };
        });
    }
    viewSingleContract(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield Contract_1.ContractModel.findById(contractId).exec();
            if (!contract)
                throw new Error("Contract not found");
            return contract;
        });
    }
    userMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalUsers = yield User_1.UserModel.countDocuments({});
            const verifiedUsers = yield User_1.UserModel.countDocuments({
                isProfileFilled: true,
            });
            const boostedUsers = yield User_1.UserModel.countDocuments({ isBoosted: true });
            const totalJobsByUser = yield User_1.UserModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$totalJobs" },
                    },
                },
            ]);
            const totalJobs = totalJobsByUser[0].total;
            return {
                totalUsers,
                verifiedUsers,
                boostedUsers,
                totalJobs,
            };
        });
    }
    clientMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalClients = yield Client_1.ClientModel.countDocuments({});
            const verifiedClients = yield Client_1.ClientModel.countDocuments({
                isVerified: true,
            });
            const totalJobsByClient = yield Client_1.ClientModel.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$totalJobs" },
                    },
                },
            ]);
            const totalJobs = totalJobsByClient[0].total;
            return {
                totalClients,
                verifiedClients,
                totalJobs,
            };
        });
    }
    getRevenue(range) {
        return __awaiter(this, void 0, void 0, function* () {
            let startDate;
            let groupFormat;
            if (range === "weekly") {
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 6);
                groupFormat = "%Y-%m-%d";
            }
            else if (range === "monthly") {
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 29);
                groupFormat = "%Y-%m-%d";
            }
            else {
                startDate = new Date();
                startDate.setFullYear(startDate.getFullYear() - 1);
                groupFormat = "%Y-%m";
            }
            const revenueDataGrossAmount = yield Admin_1.AdminModel.aggregate([
                {
                    $unwind: `$revenue.grossAmount`,
                },
                {
                    $match: {
                        [`revenue.grossAmount.createdAt`]: { $gte: startDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: groupFormat,
                                date: `$revenue.grossAmount.createdAt`,
                            },
                        },
                        total: { $sum: `$revenue.grossAmount.amount` },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
            const revenueDataTotalWithdrawals = yield Admin_1.AdminModel.aggregate([
                {
                    $unwind: `$revenue.totalWithdrawals`,
                },
                {
                    $match: {
                        [`revenue.totalWithdrawals.createdAt`]: { $gte: startDate },
                    },
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: groupFormat,
                                date: `$revenue.totalWithdrawals.createdAt`,
                            },
                        },
                        total: { $sum: `$revenue.totalWithdrawals.amount` },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
            return {
                grossAmount: revenueDataGrossAmount.map((entry) => ({
                    date: entry._id,
                    amount: entry.total,
                })),
                totalWithdrawals: revenueDataTotalWithdrawals.map((entry) => ({
                    date: entry._id,
                    amount: entry.total,
                })),
            };
        });
    }
}
exports.AdminRepository = AdminRepository;
