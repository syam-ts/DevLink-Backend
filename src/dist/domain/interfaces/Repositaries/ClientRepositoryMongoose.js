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
exports.ClientRepositoryMongoose = void 0;
const Client_1 = require("../../entities/Client");
const User_1 = require("../../entities/User");
const Notification_1 = require("../../entities/Notification");
const JobPost_1 = require("../../entities/JobPost");
const Admin_1 = require("../../entities/Admin");
const Contract_1 = require("../../entities/Contract");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const Invite_1 = require("../../entities/Invite");
class ClientRepositoryMongoose {
    createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!client.password)
                throw new Error("Password is required");
            const salt = 10;
            const hashedPassword = yield bcrypt_1.default.hash(client.password, salt);
            const createdClient = new Client_1.ClientModel({
                companyName: client.companyName,
                email: client.email,
                password: hashedPassword,
            });
            const savedClient = yield createdClient.save();
            return {
                companyName: savedClient.companyName,
                email: savedClient.email,
                password: savedClient.password,
            };
        });
    }
    signupClient(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundClient = this.findClientByEmail(email);
            if (!foundClient)
                throw new Error("Client Not Found");
            return foundClient;
        });
    }
    verifyOtp(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = client.user.data;
            if (client.mailOtp === parseInt(client.user.otp)) {
                const salt = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                let wallet = {
                    balance: 0,
                    transactions: [
                        {
                            type: "",
                            amount: 0,
                            from: "",
                            fromId: "",
                            date: "",
                        },
                    ],
                };
                const createdClient = new Client_1.ClientModel({
                    companyName: name,
                    email: email,
                    password: hashedPassword,
                    description: "",
                    numberOfEmployees: "",
                    location: "",
                    domain: "",
                    since: "",
                    totalJobs: 0,
                    isVerified: false,
                    isGoogle: false,
                    totalSpend: 0,
                    totalHours: 0,
                    wallet: { wallet },
                    request: [],
                    isBlocked: false,
                    createdAt: new Date(),
                });
                const savedClient = yield createdClient.save();
                return {
                    companyName: savedClient.companyName,
                    email: savedClient.email,
                    password: savedClient.password,
                };
            }
            else {
                throw new Error("incorrect OTP");
            }
        });
    }
    findClientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findOne({ email }).exec();
            if (!client) {
                return null;
            }
            else {
                return {
                    _id: client._id,
                    companyName: client.companyName,
                    email: client.email,
                    password: client.password,
                };
            }
        });
    }
    findClientByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findOne({ email }).exec();
            if (!client) {
                throw new Error("client not Found");
            }
            if (client.isBlocked) {
                throw new Error("Client not Authenticated");
            }
            if (!client.password) {
                throw new Error("Password is wrong");
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, client.password);
            if (!isValidPassword) {
                throw new Error("wrong password");
            }
            return {
                _id: String(client._id),
                companyName: String(client.companyName),
                email: String(client.email),
                password: String(client.password),
                isBlocked: Boolean(client.isBlocked),
                isVerified: Boolean(client.isVerified)
            };
        });
    }
    findClientByOnlyEmail(email, companyName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findOne({ email }).exec();
            if (client) {
                return {
                    _id: String(client._id),
                    companyName: String(client.companyName),
                    password: String(client.password),
                    email: String(client.email),
                    isBlocked: Boolean(client.isBlocked),
                    isVerified: Boolean(client.isVerified)
                };
            }
            else {
                const salt = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const createdClient = new Client_1.ClientModel({
                    companyName: companyName,
                    email: email,
                    password: hashedPassword,
                    description: "",
                    numberOfEmployees: "",
                    location: "",
                    domain: "",
                    since: "",
                    totalJobs: 0,
                    isVerified: false,
                    isGoogle: false,
                    totalSpend: 0,
                    totalHours: 0,
                    wallet: {},
                    request: [],
                    isBlocked: false,
                    createdAt: new Date(),
                });
                const savedClient = yield createdClient.save();
                return {
                    _id: String(savedClient._id),
                    companyName: String(savedClient.companyName),
                    password: String(savedClient.password),
                    email: String(savedClient.email),
                    isBlocked: Boolean(savedClient.isBlocked),
                    isVerified: Boolean(savedClient.isVerified)
                };
            }
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.UserModel.find({
                $and: [{ isProfileFilled: true }, { isBlocked: false }],
            })
                .limit(4)
                .lean()
                .exec();
            if (!users || users.length === 0)
                throw new Error("Users not found");
            return users;
        });
    }
    trendingJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield JobPost_1.JobPostModel.find().limit(3).exec();
            if (!jobs)
                throw new Error("Jobs not found");
            return jobs;
        });
    }
    resetPassword(clientId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pass = { password: password };
            const updatedClient = yield Client_1.ClientModel.findByIdAndUpdate(clientId, pass, {
                new: true,
            }).exec();
            if (!updatedClient) {
                throw new Error("Client not found or password update failed.");
            }
            return "Password reset successfully!";
        });
    }
    getClientProfile(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findById(clientId).lean().exec();
            if (!client)
                throw new Error("Client not found");
            return client;
        });
    }
    profileVerification(clientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = process.env.ADMIN_OBJECT_ID;
            const existingClient = yield Client_1.ClientModel.findById(clientId);
            if (!existingClient)
                throw new Error("Client not Exists");
            if (existingClient.isEditRequest)
                throw new Error("Request already sended");
            const request = {
                type: "Profile Verification Request",
                clientId: clientId,
                status: "pending",
                data: data,
            };
            const updatedAdmin = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, { $push: { request: request } }, { new: true })
                .lean()
                .exec();
            if (!updatedAdmin)
                throw new Error("Admin not found");
            const editclientRequest = yield Client_1.ClientModel.findByIdAndUpdate(clientId, { isEditRequest: true }, { update: true });
            return updatedAdmin;
        });
    }
    editClientProfile(clientId, editData, unChangedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = process.env.ADMIN_OBJECT_ID;
            const existingClient = yield Client_1.ClientModel.findById(clientId).lean();
            if (!existingClient)
                throw new Error("Client not exists");
            if (existingClient.isEditRequest) {
                throw new Error("Request already sended");
            }
            const request = {
                type: "Profile Updation Request",
                clientId: clientId,
                status: "pending",
                data: editData,
                unChangedData: unChangedData,
            };
            const updatedAdmin = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, { $push: { request: request } }, { new: true })
                .lean()
                .exec();
            if (!updatedAdmin)
                throw new Error("Admin not found");
            const editclientRequest = yield Client_1.ClientModel.findByIdAndUpdate(clientId, { isEditRequest: true }, { update: true });
            return updatedAdmin;
        });
    }
    createJobPost(clientId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findById(clientId).lean();
            if (!client)
                throw new Error("Client not found");
            //update client jobpost count
            const cilent = yield Client_1.ClientModel.findByIdAndUpdate(clientId, {
                $inc: { totalJobs: 1 },
            }, {
                new: true,
            });
            let parsedEstimatedTimeInHours = Number(data.estimateTime);
            if (data.paymentType === "hourly") {
                parsedEstimatedTimeInHours = Number(data.estimateTime);
                const totalAmount = Math.floor(data.estimateTime * data.amount);
                data.amount = totalAmount; //updatig the total amount
            }
            const createdJobPost = new JobPost_1.JobPostModel({
                title: data.title,
                description: data.description,
                keyResponsiblities: data.keyResponsiblities,
                requiredSkills: data.requiredSkills,
                paymentType: data.paymentType,
                estimateTime: new Date(),
                estimateTimeinHours: parsedEstimatedTimeInHours,
                amount: data.amount,
                expertLevel: data.expertLevel,
                location: data.location,
                projectType: data.projectType,
                maxProposals: data.maxProposals,
                proposalCount: 0,
                aboutClient: {
                    companyName: client.companyName,
                    location: client.location,
                    totalSpend: client.totalSpend,
                    totalHours: client.totalHours,
                    domain: client.domain,
                    numberOfEmployees: client.numberOfEmployees,
                    joined: client.createdAt,
                },
                status: "pending",
                isPayment: true,
                createdAt: new Date(),
                clientId: clientId,
            });
            const savedJobPost = yield createdJobPost.save();
            const newNotification = yield Notification_1.NotificationModel.create({
                type: "New Job Post",
                message: "New Post created successfully",
                sender_id: process.env._ADMIN_OBJECT_ID,
                reciever_id: clientId,
                createdAt: new Date(),
            });
            newNotification.save();
            return savedJobPost;
        });
    }
    getAllNotifications(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifications = yield Notification_1.NotificationModel.aggregate([
                {
                    $match: { reciever_id: clientId },
                },
                {
                    $sort: { createdAt: -1 },
                },
            ]);
            if (!notifications) {
                throw new Error("No notification found");
            }
            else {
                return notifications;
            }
        });
    }
    findAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const allJobs = yield JobPost_1.JobPostModel.find().exec();
            if (!allJobs || allJobs.length === 0)
                throw new Error("No job found");
            return allJobs;
        });
    }
    getSelectedJobs(clientId, jobType, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_size = 3;
            const skip = (currentPage - 1) * page_size;
            let totalPages;
            if (jobType === "myJobs") {
                const totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                    $and: [{ clientId: clientId }, { status: "pending" }],
                });
                totalPages = Math.ceil(totalJobs / page_size);
                const jobs = yield JobPost_1.JobPostModel.find({
                    $and: [{ clientId: clientId }, { status: "pending" }],
                })
                    .skip(skip)
                    .limit(page_size);
                if (!jobs)
                    throw new Error("No jobs found");
                return {
                    jobs,
                    totalPages,
                };
            }
            else if (jobType === "completedJobs") {
                const totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                    $and: [
                        {
                            clientId: clientId,
                        },
                        {
                            status: "closed",
                        },
                    ],
                });
                totalPages = Math.ceil(totalJobs / page_size);
                const jobs = yield JobPost_1.JobPostModel.find({
                    $and: [
                        {
                            clientId: clientId,
                        },
                        {
                            status: "closed",
                        },
                    ],
                })
                    .skip(skip)
                    .limit(page_size);
                if (!jobs)
                    throw new Error("No jobs found");
                return {
                    jobs,
                    totalPages,
                };
            }
            else {
                throw new Error("Invalid selection");
            }
        });
    }
    getProposals(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findById(clientId).lean().exec();
            if (!client)
                throw new Error("Client not found");
            const proposals = client.proposals;
            return proposals;
        });
    }
    getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findById(userId).lean().exec();
            if (!user) {
                throw new Error("User not found");
            }
            else {
                const userProfile = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    profilePicture: user.profilePicture,
                    location: user.location,
                    description: user.description,
                    skills: user.skills,
                    experience: user.experience,
                    budget: user.budget,
                    totalJobs: user.totalJobs,
                    totalHours: user.totalHours,
                    domain: user.domain,
                    githubLink: user.githubLink,
                    whyHireMe: user.whyHireMe,
                    education: user.education,
                    completedJobs: user.completedJobs,
                    inProgress: user.inProgress,
                    workHistory: user.workHistory,
                };
                return userProfile;
            }
        });
    }
    getallDevelopers() {
        return __awaiter(this, void 0, void 0, function* () {
            const developers = yield User_1.UserModel.find({ isProfileFilled: true }).exec();
            if (!developers || developers.length === 0)
                throw new Error("Developers not found");
            return developers;
        });
    }
    viewContracts(clientId, contractViewType, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_size = 3;
            const skip = (currentPage - 1) * page_size;
            let contract, totalContracts;
            if (contractViewType === "pending") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ clientId: clientId }, { status: "on progress" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ clientId: clientId }, { status: "on progress" }],
                })
                    .skip(skip)
                    .limit(page_size);
            }
            else if (contractViewType === "submitted") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ clientId: clientId }, { status: "submitted" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ clientId: clientId }, { status: "submitted" }],
                })
                    .skip(skip)
                    .limit(page_size);
            }
            else if (contractViewType === "rejected") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ clientId: clientId }, { status: "rejected" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ clientId: clientId }, { status: "rejected" }],
                })
                    .skip(skip)
                    .limit(page_size);
            }
            else if (contractViewType === "completed") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ clientId: clientId }, { status: "closed" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ clientId: clientId }, { status: "closed" }],
                })
                    .skip(skip)
                    .limit(page_size);
            }
            else {
                throw new Error("Bad selection");
            }
            if (!contract) {
                throw new Error("contract not found");
            }
            else {
                const totalPages = Math.ceil(totalContracts / page_size);
                return { contract, totalPages };
            }
        });
    }
    viewWallet(clientId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const PAGE_SIZE = 6;
            const skip = (page - 1) * PAGE_SIZE;
            const theWallet = yield Client_1.ClientModel.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(clientId) } },
                { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
            ]);
            const totalTransactions = theWallet.length > 0 ? theWallet[0].totalTransactions : 0;
            const totalPages = totalTransactions / PAGE_SIZE;
            const wallet = yield Client_1.ClientModel.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(clientId) } },
                {
                    $project: {
                        transactions: {
                            $slice: ["$wallet.transactions", skip, PAGE_SIZE],
                        },
                        balance: "$wallet.balance",
                        _id: 0,
                    },
                },
            ]);
            return {
                wallet,
                totalPages,
            };
        });
    }
    addMoneyToAdminWallet(role, roleId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminId = process.env.ADMIN_OBJECT_ID;
            const admin = yield Admin_1.AdminModel.findById(adminId);
            if (!admin)
                throw new Error("Unknown Error Occured");
            const walletEntry = {
                type: "credit",
                amount: amount,
                from: role,
                fromId: roleId,
                date: new Date(),
            };
            const updateAdminWallet = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, {
                $inc: { "wallet.balance": amount },
                $push: { "wallet.transactions": walletEntry },
            }, {
                new: true,
                upsert: false,
            }).exec();
            if (!updateAdminWallet) {
                console.error("Update failed. Admin Wallet was not updated.");
                throw new Error("Admin wallet update failed.");
            }
            return "success";
        });
    }
    viewSubmissions(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield Client_1.ClientModel.findById(clientId).lean().exec();
            if (!client)
                throw new Error("Client not found");
            return client.projectSubmissions;
        });
    }
    createContract(clientId, userId, jobPostId, bidAmount, bidDeadline) {
        return __awaiter(this, void 0, void 0, function* () {
            // updating job post status
            const currentJobPost = yield JobPost_1.JobPostModel.findByIdAndUpdate(jobPostId, {
                status: "on progress",
            }, {
                update: true,
            }).exec();
            if (!currentJobPost)
                throw new Error("Jobpost not exists");
            const currentClient = yield Client_1.ClientModel.findById(clientId).exec();
            if (!currentClient)
                throw new Error("client not exists");
            const currentUser = yield User_1.UserModel.findById(userId).exec();
            if (!currentUser)
                throw new Error("user not exists");
            // reomove all the proposals for this jobpost
            const client = yield Client_1.ClientModel.findByIdAndUpdate(clientId, { $pull: { proposals: { jobPostId: jobPostId } } }, { new: true });
            const newContract = new Contract_1.ContractModel({
                clientId: clientId,
                userId: userId,
                jobPostId: jobPostId,
                clientData: {
                    companyName: currentClient.companyName,
                    email: currentClient.email,
                    location: currentClient.location,
                },
                userData: {
                    name: currentUser.name,
                    email: currentUser.email,
                    location: currentUser.location,
                },
                jobPostData: {
                    title: currentJobPost.title,
                    description: currentJobPost.description,
                    expertLevel: currentJobPost.expertLevel,
                    projectType: currentJobPost.projectType,
                },
                amount: bidAmount,
                deadline: bidDeadline,
                active: true,
                status: "on progress",
                createdAt: new Date(),
            });
            const savedContract = yield newContract.save();
            // const timer = currentJobPost.estimateTimeinHours;
            // const contractId = savedContract._id;
            const adminId = process.env.ADMIN_OBJECT_ID;
            const newNotificationUser = (yield Notification_1.NotificationModel.create({
                type: "new contract",
                message: "New Contract signed in",
                sender_id: adminId,
                reciever_id: userId,
                newContract: {
                    contractId: savedContract._id,
                },
                createdAt: new Date(),
            }));
            const newNotificationClient = (yield Notification_1.NotificationModel.create({
                type: "Contract",
                message: "New Contract signed in",
                sender_id: adminId,
                reciever_id: clientId,
                newContract: {
                    contractId: savedContract._id,
                },
                createdAt: new Date(),
            }));
            newNotificationUser.save();
            newNotificationClient.save();
            //await allCronJobs.startContractHelperFn(timer, jobPostId, userId, contractId);
            return {
                newNotificationUser,
                newNotificationClient,
            };
        });
    }
    rejectProposal(clientId, userId, jobPostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const proposal = yield Client_1.ClientModel.findOneAndUpdate({
                _id: new mongoose_1.default.Types.ObjectId(clientId),
                proposals: {
                    $elemMatch: {
                        userId: new mongoose_1.default.Types.ObjectId(userId),
                        jobPostId: new mongoose_1.default.Types.ObjectId(jobPostId),
                    },
                },
            }, {
                $set: { "proposals.$.status": "rejected" },
            }, { new: true })
                .lean()
                .exec();
            if (!proposal)
                throw new Error("Client not exists");
            // -------------- decrementing proposalCount --------------
            const updatetingCount = yield JobPost_1.JobPostModel.findByIdAndUpdate(jobPostId, {
                $inc: { proposalCount: -1 },
            }, {
                new: true,
            });
            console.log(updatetingCount);
            return proposal;
        });
    }
    listAllJobs(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield JobPost_1.JobPostModel.find({ clientId: clientId }).exec();
            if (!jobs || jobs.length === 0)
                throw new Error("No jobs found");
            return jobs;
        });
    }
    closeContract(contractId, progress) {
        return __awaiter(this, void 0, void 0, function* () {
            //update contract status as closed ----------------
            if (!progress)
                throw new Error("Progress data missing");
            const currentContract = yield Contract_1.ContractModel.findByIdAndUpdate(contractId, {
                active: false,
                status: "closed",
            }, { update: true });
            if (!currentContract)
                throw new Error("Contract not found");
            //update jobpost status as closed ----------------
            const jobPostId = currentContract.jobPostId;
            const currentJobPost = yield JobPost_1.JobPostModel.findByIdAndUpdate(jobPostId, {
                status: "closed",
            }, { new: true });
            if (!currentJobPost)
                throw new Error("Jobpost not exists");
            const finalAmount = Math.round(currentContract.amount - (currentContract.amount * 10) / 100);
            const adminDeduction = Math.floor((currentContract.amount * 10) / 100);
            const adminId = process.env.ADMIN_OBJECT_ID;
            let updateUserWallet, updateAdminWallet, updateClientWallet;
            // find and substract admin wallet ----------------
            const walletEntryAdmin = {
                type: "debit",
                amount: finalAmount,
                from: "admin",
                fromId: adminId,
                date: new Date(),
            };
            updateAdminWallet = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, {
                $inc: {
                    "wallet.balance": -finalAmount,
                },
                $push: {
                    "wallet.transactions": walletEntryAdmin,
                    "revenue.grossAmount": {
                        amount: adminDeduction,
                        createdAt: Date.now(),
                    },
                },
            }, { new: true }).exec();
            if (progress === 100) {
                const walletEntryUser = {
                    type: "credit",
                    amount: finalAmount,
                    from: "admin",
                    fromId: adminId,
                    date: new Date(),
                };
                updateUserWallet = yield User_1.UserModel.findByIdAndUpdate(currentContract.userId, {
                    $inc: { "wallet.balance": finalAmount },
                    $push: { "wallet.transactions": walletEntryUser },
                }, {
                    new: true,
                    upsert: false,
                }).exec();
            }
            else {
                //update user wallet according to the progress ----------------
                const userFinalPayment = (finalAmount * progress) / 100;
                const walletEntryUser = {
                    type: "credit",
                    amount: userFinalPayment,
                    from: "admin",
                    fromId: adminId,
                    date: new Date(),
                };
                updateUserWallet = yield User_1.UserModel.findByIdAndUpdate(currentContract.userId, {
                    $inc: { "wallet.balance": userFinalPayment },
                    $push: { "wallet.transactions": walletEntryUser },
                }, {
                    new: true,
                    upsert: false,
                }).exec();
                //rest of the amount go to client wallet ----------------
                const clientLeftoverAmount = finalAmount - userFinalPayment;
                const walletEntryClient = {
                    type: "credit",
                    amount: clientLeftoverAmount,
                    from: "admin",
                    fromId: adminId,
                    date: new Date(),
                };
                updateClientWallet = yield Client_1.ClientModel.findByIdAndUpdate(currentContract.clientId, {
                    $inc: { "wallet.balance": clientLeftoverAmount },
                    $push: { "wallet.transactions": walletEntryClient },
                }, {
                    new: true,
                    upsert: false,
                }).exec();
            }
            //remove project submission from client ----------------
            const clientId = currentContract.clientId;
            const currentClient = yield Client_1.ClientModel.findByIdAndUpdate(clientId, {
                $pull: { projectSubmissions: { contractId: contractId } },
            }, { new: true });
            //update to user workHistory ----------------
            const updateUser = yield User_1.UserModel.findByIdAndUpdate(currentContract.userId, {
                $push: {
                    workHistory: {
                        _id: currentJobPost._id,
                        title: currentJobPost.title,
                        description: currentJobPost.description,
                        expertLevel: currentJobPost.expertLevel,
                        location: currentJobPost.location,
                        amount: currentJobPost.amount,
                        paymentType: currentJobPost.paymentType,
                        estimateTimeinHours: currentJobPost.estimateTimeinHours,
                        projectType: currentJobPost.projectType,
                        requiredSkills: currentJobPost.requiredSkills,
                    },
                },
            }, {
                new: true,
            });
            const newNotificationUser = yield Notification_1.NotificationModel.create({
                type: "contract closed",
                message: "You successfully completed a Job Contract",
                sender_id: process.env._ADMIN_OBJECT_ID,
                reciever_id: currentContract.userId,
                closeContract: {
                    contractId: contractId,
                },
                createdAt: new Date(),
            });
            const newNotificationClient = yield Notification_1.NotificationModel.create({
                type: "contract-close",
                message: "One Contract Successfully Closed",
                sender_id: process.env._ADMIN_OBJECT_ID,
                reciever_id: currentContract.clientId,
                closeContract: {
                    contractId: contractId,
                    userId: currentContract.userId,
                },
                createdAt: new Date(),
            });
            newNotificationUser.save();
            newNotificationClient.save();
            return {
                updateUserWallet,
                updateAdminWallet,
                updateClientWallet,
                newNotificationUser,
                newNotificationClient,
            };
        });
    }
    rateAndReviewUser(userId, clientId, notificationId, rating, review) {
        return __awaiter(this, void 0, void 0, function* () {
            const rateData = yield User_1.UserModel.findById(userId);
            if (!rateData)
                throw new Error("User not found");
            const ratingSum = rateData.rating.ratingSum;
            const noOfRating = rateData.rating.noOfRating;
            let avgRating = (ratingSum + rating) / (noOfRating + 1);
            avgRating = Math.min(avgRating, 4.9);
            const finalRating = Math.floor(avgRating * 10) / 10;
            const reviewData = {
                theReview: review,
                rating: rating,
            };
            const client = yield Client_1.ClientModel.findById(clientId).lean();
            if (!client)
                throw new Error("Client not found");
            const updateUser = yield User_1.UserModel.findByIdAndUpdate(userId, {
                $inc: { "rating.ratingSum": rating, "rating.noOfRating": 1 },
                "rating.avgRating": finalRating,
                $push: {
                    review: {
                        theReview: review,
                        rating: rating,
                        companyName: client.companyName,
                    },
                },
            }, { new: true })
                .lean()
                .exec();
            if (!updateUser)
                throw new Error("user not exists");
            const removeExtra = yield Notification_1.NotificationModel.findByIdAndUpdate(notificationId, { extra: {} }, { update: true })
                .lean()
                .exec();
            if (!removeExtra)
                throw new Error("notification not exists");
            return { updateUser, removeExtra };
        });
    }
    inviteUser(userId, clientId, jobPostId, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobPostData = yield JobPost_1.JobPostModel.findById(jobPostId);
            if (!jobPostData)
                throw new Error("jobpost not found");
            const client = yield Client_1.ClientModel.findById(clientId);
            if (!client)
                throw new Error("client not found");
            const existingInvite = yield Invite_1.InviteModel.find({
                $and: [{ "jobPostData._id": jobPostId }, { userId: userId }],
            });
            if (existingInvite.length !== 0)
                throw new Error("Invite already send");
            const inviteFn = new Invite_1.InviteModel({
                clientId,
                userId,
                description,
                jobPostData: {
                    _id: jobPostData._id,
                    title: jobPostData.title,
                    description: jobPostData.description,
                    expertLevel: jobPostData.expertLevel,
                    location: jobPostData.location,
                    requiredSkills: jobPostData.requiredSkills,
                    amount: jobPostData.amount,
                    paymentType: jobPostData.paymentType,
                    estimateTimeinHours: jobPostData.estimateTimeinHours,
                    projectType: jobPostData.projectType,
                },
                clientData: {
                    companyName: client.companyName,
                    email: client.email,
                    location: client.location,
                },
                state: "pending",
                createdAt: new Date(),
            });
            const savedInvite = yield inviteFn.save();
            const newNotificationClient = yield Notification_1.NotificationModel.create({
                type: "invited user",
                message: "Invite sended to the user",
                sender_id: process.env._ADMIN_OBJECT_ID,
                reciever_id: clientId,
                inviteSuccess: {
                    userId: userId,
                },
                createdAt: new Date(),
            });
            console.log(newNotificationClient);
            return savedInvite;
        });
    }
    getSingleJobPost(jobPostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobPost = yield JobPost_1.JobPostModel.findById(jobPostId).exec();
            if (!jobPost)
                throw new Error("Job Post didnt found");
            return jobPost;
        });
    }
    ViewInviteClient(clientId, inviteType) {
        return __awaiter(this, void 0, void 0, function* () {
            let invite;
            if (inviteType === "pending") {
                invite = yield Invite_1.InviteModel.find({
                    $and: [{ clientId: clientId }, { status: "pending" }],
                })
                    .lean()
                    .exec();
            }
            else {
                invite = yield Invite_1.InviteModel.find({
                    $and: [{ clientId: clientId }, { status: "rejected" }],
                })
                    .lean()
                    .exec();
            }
            if (!invite)
                throw new Error("No invites found");
            return invite;
        });
    }
    rejectContract(contractId, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentContract = yield Contract_1.ContractModel.findById(contractId)
                .lean()
                .exec();
            if (!currentContract)
                throw new Error("Contract not exists");
            //admin share would be 10%
            const adminId = process.env.ADMIN_OBJECT_ID;
            const userId = currentContract.userId;
            const adminWalletDeduction = Math.floor((currentContract.amount * 10) / 100);
            const finalAmountToAdminWallet = Math.floor(currentContract.amount - adminWalletDeduction);
            const walletEntryAdmin = {
                type: "debit",
                amount: finalAmountToAdminWallet,
                from: "admin",
                fromId: adminId,
                date: new Date(),
            };
            const adminWallet = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, {
                $inc: { "wallet.balance": -finalAmountToAdminWallet },
                $push: { "wallet.transactions": walletEntryAdmin },
            }, {
                new: true,
            });
            //usershare would be 10%
            const userShare = Math.floor((finalAmountToAdminWallet * 10) / 100);
            const walletEntryUser = {
                type: "credit",
                amount: userShare,
                from: "admin",
                fromId: adminId,
                date: new Date(),
            };
            const userWallet = yield User_1.UserModel.findByIdAndUpdate(userId, {
                $inc: { "wallet.balance": userShare },
                $push: { "wallet.transactions": walletEntryUser },
            }, {
                new: true,
            });
            //rest of the amount go to client wallet
            const finalAmountToClientWallet = Math.floor(finalAmountToAdminWallet - userShare);
            const walletEntryClient = {
                type: "credit",
                amount: finalAmountToClientWallet,
                from: "admin",
                fromId: adminId,
                date: new Date(),
            };
            // final amount go to client wallet and status changed to rejected
            const updateClientWallet = yield Client_1.ClientModel.findByIdAndUpdate(clientId, {
                status: "rejected",
                $inc: {
                    "wallet.balance": finalAmountToClientWallet,
                },
                $push: {
                    "wallet.transactions": walletEntryClient,
                },
            }, {
                new: true,
            });
            const contract = yield Contract_1.ContractModel.findByIdAndUpdate(contractId, {
                status: "rejected",
            }, {
                new: true,
            });
            if (!contract)
                throw new Error("Contract not found");
            // deleting the entire submission doc from client
            const updatedClient = yield Client_1.ClientModel.findOneAndUpdate({ "projectSubmissions.contractId": contractId }, { $pull: { projectSubmissions: { contractId } } }, { new: true });
            return contract;
        });
    }
    searchDeveloper(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const developers = yield User_1.UserModel.find({
                name: { $regex: input, $options: "i" },
            })
                .lean()
                .exec();
            if (!developers)
                throw new Error("No developer found");
            return developers;
        });
    }
    withdrawMoney(clientId, amount, accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let userName;
            const client = yield Client_1.ClientModel.findById(clientId).lean().exec();
            if (!client)
                throw new Error("client not exists");
            userName = client.companyName;
            const adminId = process.env.ADMIN_OBJECT_ID;
            if (!mongoose_1.default.Types.ObjectId.isValid(clientId)) {
                throw new Error("Invalid clientId: Must be a 24-character hex string.");
            }
            const withdrawRequestObject = {
                roleId: new mongoose_1.default.Types.ObjectId(clientId),
                userName: userName,
                amount: amount,
                accountNumber: accountNumber.toString(),
                createdAt: new Date(),
            };
            const withdrawRequest = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, { $push: { withdrawRequest: withdrawRequestObject } }, { new: true });
            return;
        });
    }
}
exports.ClientRepositoryMongoose = ClientRepositoryMongoose;
