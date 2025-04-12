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
exports.UserRepositoryMongoose = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../entities/User");
const Client_1 = require("../../entities/Client");
const JobPost_1 = require("../../entities/JobPost");
const Contract_1 = require("../../entities/Contract");
const Admin_1 = require("../../entities/Admin");
const Notification_1 = require("../../entities/Notification");
const mongoose_1 = __importDefault(require("mongoose"));
const Invite_1 = require("../../entities/Invite");
;
;
;
class UserRepositoryMongoose {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            const salt = parseInt(process.env.BCRYPT_SALT, 10);
            const hashedPassword = yield bcrypt_1.default.hash(user.password, salt);
            const createdUser = new User_1.UserModel({
                name: user.name,
                email: user.email,
                password: hashedPassword,
                mobile: user.mobile,
                role: (_a = user.role) !== null && _a !== void 0 ? _a : "user",
                skills: (_b = user.skills) !== null && _b !== void 0 ? _b : [],
                profilePicture: (_c = user.profilePicture) !== null && _c !== void 0 ? _c : "",
                location: (_d = user.location) !== null && _d !== void 0 ? _d : "",
                description: (_e = user.description) !== null && _e !== void 0 ? _e : "",
                experience: (_f = user.experience) !== null && _f !== void 0 ? _f : "",
                education: (_g = user.education) !== null && _g !== void 0 ? _g : "",
                budget: (_h = user.budget) !== null && _h !== void 0 ? _h : 0,
                rating: (_j = user.rating) !== null && _j !== void 0 ? _j : 0,
                domain: (_k = user.domain) !== null && _k !== void 0 ? _k : "",
                githubLink: (_l = user.githubLink) !== null && _l !== void 0 ? _l : "",
                totalJobs: (_m = user.totalJobs) !== null && _m !== void 0 ? _m : 0,
                totalHours: (_o = user.totalHours) !== null && _o !== void 0 ? _o : 0,
                whyHireMe: (_p = user.whyHireMe) !== null && _p !== void 0 ? _p : "",
                completedJobs: (_q = user.completedJobs) !== null && _q !== void 0 ? _q : "",
                inProgress: (_r = user.inProgress) !== null && _r !== void 0 ? _r : "",
                workHistory: (_s = user.workHistory) !== null && _s !== void 0 ? _s : [],
                isEditRequest: false,
                isProfileFilled: false,
                request: [],
                wallet: [],
                isBlocked: false,
                isBoosted: false,
                createdAt: new Date(),
            });
            const savedUser = yield createdUser.save();
            return {
                name: savedUser.name,
                email: savedUser.email,
                password: savedUser.password,
                mobile: savedUser.mobile,
                role: savedUser.role,
                skills: savedUser.skills,
                profilePicture: savedUser.profilePicture,
                location: savedUser.location,
                description: savedUser.description,
                experience: savedUser.experience,
                education: savedUser.education,
                budget: savedUser.budget,
                rating: savedUser.rating,
                domain: savedUser.domain,
                githubLink: savedUser.githubLink,
                totalJobs: savedUser.totalJobs,
                totalHours: savedUser.totalHours,
                whyHireMe: savedUser.whyHireMe,
                completedJobs: savedUser.completedJobs,
                inProgress: savedUser.inProgress,
                workHistory: savedUser.workHistory,
                isEditRequest: savedUser.isEditRequest,
                isProfileFilled: savedUser.isProfileFilled,
                request: savedUser.request,
                wallet: savedUser.wallet,
                isBlocked: savedUser.isBlocked,
                isBoosted: savedUser.isBoosted,
                createdAt: savedUser.createdAt,
            };
        });
    }
    signupUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = this.findUserByEmail(email);
            if (!foundUser)
                throw new Error("User Not found");
            return foundUser;
        });
    }
    verifyOtp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, mobile, } = user.user.data;
            if (Number(user.mailOtp) == Number(user.userOtp)) {
                const salt = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const createdUser = new User_1.UserModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    mobile: mobile,
                    skills: "",
                    profilePicture: "",
                    location: "",
                    description: "",
                    experience: "",
                    education: "",
                    budget: "",
                    rating: {
                        ratingSum: 0,
                        noOfRating: 0,
                        avgRating: 0,
                    },
                    review: [],
                    domain: "",
                    githubLink: "",
                    totalJobs: "",
                    totalHours: "",
                    whyHireMe: "",
                    completedJobs: "",
                    inProgress: "",
                    workHistory: [],
                    isEditRequest: false,
                    isProfileFilled: false,
                    request: [],
                    wallet: [],
                    isBlocked: false,
                    isBoosted: false,
                    createdAt: new Date(),
                });
                const savedUser = yield createdUser.save();
                return {
                    name: savedUser.name,
                    email: savedUser.email,
                    mobile: savedUser.mobile,
                };
            }
            else {
                throw new Error("incorrect OTP");
            }
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findById(userId).lean().exec();
            if (!user)
                throw new Error("User not found");
            return user;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ email }).lean().exec();
            if (!user) {
                return null;
            }
            else {
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    mobile: user.mobile,
                };
            }
        });
    }
    findUserByEmailAndPassword(email, passwordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ email }).lean().exec();
            if (!user)
                throw new Error("User not Found");
            if (user.isBlocked)
                throw new Error("User not Authenticated");
            const { password } = user;
            const isValidPassword = yield bcrypt_1.default.compare(passwordUser, password);
            if (!isValidPassword) {
                throw new Error("wrong password");
            }
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                isBlocked: user.isBlocked,
                isProfileFilled: user.isProfileFilled,
            };
        });
    }
    findUserByOnlyEmail(email, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ email }).exec();
            if (user) {
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    isBlocked: user.isBlocked,
                    isProfileFilled: user.isProfileFilled,
                };
            }
            else {
                const salt = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const createdUser = new User_1.UserModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    mobile: 0,
                    skills: "",
                    profilePicture: "",
                    location: "",
                    description: "",
                    experience: "",
                    education: "",
                    budget: "",
                    rating: {
                        ratingSum: 0,
                        noOfRating: 0,
                        avgRating: 0,
                    },
                    review: [],
                    domain: "",
                    githubLink: "",
                    totalJobs: "",
                    totalHours: "",
                    whyHireMe: "",
                    completedJobs: "",
                    inProgress: "",
                    workHistory: [],
                    isEditRequest: false,
                    isProfileFilled: false,
                    request: [],
                    wallet: [],
                    isBlocked: false,
                    isBoosted: false,
                    createdAt: new Date(),
                });
                const savedUser = yield createdUser.save();
                return {
                    _id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    mobile: savedUser.mobile,
                };
            }
        });
    }
    findAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield Client_1.ClientModel.find({ isVerified: true })
                .limit(3)
                .lean()
                .exec();
            if (!clients)
                throw new Error('Clients not found');
            return clients;
        });
    }
    resetPassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield User_1.UserModel.findByIdAndUpdate(userId, { password: password }, { new: true }).exec();
            if (!updatedUser)
                throw new Error("User not found or password update failed.");
            return "Password reset successfully!";
        });
    }
    alterUserProfile(userId, userData, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const { editData } = userData;
            editData.isProfileFilled = true;
            if (type === "verify") {
                const user = yield User_1.UserModel.findByIdAndUpdate(userId, editData, {
                    new: true,
                }).lean().exec();
                if (!user)
                    throw new Error("User not found");
                return {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        isBlocked: user.isBlocked,
                        isProfileFilled: user.isProfileFilled,
                        password: user.password,
                        mobile: user.mobile,
                        skills: user.skills,
                        location: user.location,
                        description: user.description,
                        experience: user.experience,
                        education: user.education,
                        budget: user.budget,
                        rating: user.rating,
                        domain: user.domain,
                        githubLink: user.githubLink,
                        totalJobs: user.totalJobs,
                        totalHours: user.totalHours,
                        whyHireMe: user.whyHireMe,
                        completedJobs: user.completedJobs,
                        inProgress: user.inProgress,
                        workHistory: user.workHistory,
                        isEditRequest: user.isEditRequest,
                        request: user.request,
                        wallet: user.wallet,
                        isBoosted: user.isBoosted,
                        createdAt: user.createdAt
                    },
                };
            }
            else {
                const user = yield User_1.UserModel.findByIdAndUpdate(userId, editData, {
                    new: true,
                }).lean().exec();
                if (!user)
                    throw new Error("User not found");
                return {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        isBlocked: user.isBlocked,
                        isProfileFilled: user.isProfileFilled,
                        password: user.password,
                        mobile: user.mobile,
                        skills: user.skills,
                        location: user.location,
                        description: user.description,
                        experience: user.experience,
                        education: user.education,
                        budget: user.budget,
                        rating: user.rating,
                        domain: user.domain,
                        githubLink: user.githubLink,
                        totalJobs: user.totalJobs,
                        totalHours: user.totalHours,
                        whyHireMe: user.whyHireMe,
                        completedJobs: user.completedJobs,
                        inProgress: user.inProgress,
                        workHistory: user.workHistory,
                        isEditRequest: user.isEditRequest,
                        request: user.request,
                        wallet: user.wallet,
                        isBoosted: user.isBoosted,
                        createdAt: user.createdAt
                    }
                };
            }
        });
    }
    viewProposals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let findProposals = yield Client_1.ClientModel.find({
                proposals: { $elemMatch: { userId } },
            }).exec();
            if (!findProposals.length)
                throw new Error("No proposal found");
            let proposals = [];
            for (let i = 0; i < findProposals.length; i++) {
                proposals.push(...findProposals[i].proposals);
            }
            const finalProposals = proposals.flat(1);
            return finalProposals;
        });
    }
    createProposal(userId, jobPostId, description, bidAmount, bidDeadline) {
        return __awaiter(this, void 0, void 0, function* () {
            //CHECK IF MAX PROP REACHED
            const proposals = yield JobPost_1.JobPostModel.findById(jobPostId).lean().exec();
            if (!proposals)
                throw new Error('Jobpost not found');
            const { proposalCount, maxProposals } = proposals;
            if (proposalCount === maxProposals)
                throw new Error("Maximum proposals reched");
            const user = yield User_1.UserModel.findById(userId);
            if (!user)
                throw new Error("User not found");
            //Removing existing proposal doc
            const existingProposal = yield Client_1.ClientModel.find({
                $and: [
                    { "proposals.userId": userId },
                    { "proposals.jobPostId": jobPostId },
                ],
            });
            if (existingProposal.length !== 0) {
                throw new Error("Proposal alredy send");
            }
            else {
                const jobpost = yield JobPost_1.JobPostModel.findByIdAndUpdate(jobPostId, {
                    $inc: { proposalCount: 1 },
                }, {
                    new: true,
                });
                if (!jobpost)
                    throw new Error('Jobpost not found');
                // deletes invite doc if exists
                const clearInvite = yield Invite_1.InviteModel.deleteOne({ "jobPostData._id": jobPostId });
                const newProposal = {
                    type: "New Job Proposal ",
                    userId: userId,
                    userData: {
                        profilePicture: user.profilePicture,
                    },
                    jobPostId: jobPostId,
                    jobPostInfo: jobpost.title,
                    description: description,
                    status: "pending",
                    bidAmount: bidAmount,
                    bidDeadline: bidDeadline,
                    createdAt: new Date(),
                };
                const proposal = yield Client_1.ClientModel.findByIdAndUpdate(jobpost.clientId, { $push: { proposals: newProposal } }, { new: true }).lean();
                if (!proposal)
                    throw new Error('Proposals not found');
                const newNotificationUser = yield Notification_1.NotificationModel.create({
                    type: "New Job Proposal",
                    message: "New Proposal send successfully",
                    sender_id: userId,
                    reciever_id: userId,
                    createdAt: new Date(),
                });
                //send to client
                const newNotificationClient = yield Notification_1.NotificationModel.create({
                    type: "New Job Proposal",
                    message: "New Job Proposal Received",
                    sender_id: userId,
                    reciever_id: jobpost.clientId,
                    createdAt: new Date(),
                });
                newNotificationUser.save();
                newNotificationClient.save();
                return { proposal, notification: newNotificationUser };
            }
        });
    }
    listHomeJobs(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "listAllJobs") {
                const totalJobs = yield JobPost_1.JobPostModel.countDocuments();
                const verifiedAccounts = yield Client_1.ClientModel.countDocuments({
                    isVerified: true,
                });
                const allJobs = yield JobPost_1.JobPostModel.find({ status: "pending" })
                    .limit(3)
                    .exec();
                const totalHours = yield JobPost_1.JobPostModel.aggregate([
                    { $group: { _id: null, sum: { $sum: "$estimateTimeinHours" } } },
                ]);
                if (!allJobs) {
                    throw new Error("No job found");
                }
                else {
                    return { allJobs, totalJobs, totalHours, verifiedAccounts };
                }
            }
            else if (type === "latestJobs") {
                const latestJobs = yield JobPost_1.JobPostModel.find({})
                    .sort({ createdAt: -1 })
                    .limit(3)
                    .exec();
                return { latestJobs };
            }
            else {
                throw new Error("Jobs not founded");
            }
        });
    }
    allNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifications = yield Notification_1.NotificationModel.find({
                reciever_id: userId,
            })
                .sort({ createdAt: -1 })
                .exec();
            return notifications;
        });
    }
    getSelectedJobs(userId, jobType, query, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_size = 4;
            const skip = (currentPage - 1) * page_size;
            const user = yield User_1.UserModel.findById(userId).exec();
            if (!user || !user.skills)
                throw new Error("User has no skills or does not exist.");
            if (jobType === "listAllJobs") {
                let totalJobs, jobs, totalPages;
                if (query.amount) {
                    if (Number(query.amount) === 500) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                            status: "pending",
                            amount: { $gt: 100, $lt: 500 }
                        });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({
                            status: "pending",
                            amount: { $gt: 100, $lt: 500 }
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (Number(query.amount) === 2000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                            status: "pending",
                            amount: { $gt: 500, $lt: 2000 }
                        });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({
                            status: "pending",
                            amount: { $gt: 500, $lt: 2000 }
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (Number(query.amount) === 10000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                            status: "pending",
                            amount: { $gt: 2000, $lt: 200000 }
                        });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({
                            status: "pending",
                            amount: { $gt: 2000, $lt: 10000 }
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (Number(query.amount) === 50000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                            status: "pending",
                            amount: { $gt: 10000, $lt: 50000 }
                        });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({
                            status: "pending",
                            amount: { $gt: 10000, $lt: 50000 }
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (Number(query.amount) === 70000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                            status: "pending",
                            amount: { $gt: 50000, $lt: 70000 }
                        });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({
                            status: "pending",
                            amount: { $gt: 50000, $lt: 70000 }
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                }
                else if (query.expertLevel) {
                    if (query.expertLevel === 'beginner') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.expertLevel === 'intermediate') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.expertLevel === 'advanced') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] })
                            .skip(skip)
                            .limit(page_size);
                    }
                }
                else if (query.paymentType) {
                    if (query.paymentType === 'hourly') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ status: "pending", paymentType: 'hourly' });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'hourly' }] })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.paymentType === 'fixed') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] })
                            .skip(skip)
                            .limit(page_size);
                    }
                }
                if (!jobs)
                    throw new Error("No jobs found");
                return {
                    jobs,
                    totalPages,
                };
            }
            else if (jobType === "trendingJobs") {
                let totalJobs, jobs, totalPages;
                totalJobs = yield JobPost_1.JobPostModel.countDocuments();
                totalPages = Math.ceil(totalJobs / page_size);
                jobs = yield JobPost_1.JobPostModel.find({ status: "pending" })
                    .sort({
                    proposalCount: -1,
                })
                    .skip(skip)
                    .limit(page_size);
                if (query.amount) {
                    if (query.amount === 500) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 500 }, { $gt: 100 }] } }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 500 }, { $gt: 100 }] } }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.amount === 2000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                            $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 2000 }, { $gt: 500 }] } }]
                        });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 2000 }, { $gt: 500 }] } }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (Number(query.amount) === 10000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending", }, { $and: [{ amount: { $lt: 10000 } }, { amount: { $gt: 2000 } }] }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending", }, { $and: [{ amount: { $lt: 10000 } }, { amount: { $gt: 2000 } }] }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.amount === 50000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 50000 }, { $gt: 10000 }] } }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 50000 }, { $gt: 10000 }] } }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.amount === 70000) {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 70000 }, { $gt: 50000 }] } }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending", }, { amount: { $and: [{ $lt: 70000 }, { $gt: 50000 }] } }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                }
                else if (query.expertLevel) {
                    if (query.expertLevel === 'beginner') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'beginner' }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.expertLevel === 'intermediate') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'intermediate' }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.expertLevel === 'advanced') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { expertLevel: 'advanced' }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                }
                else if (query.paymentType) {
                    if (query.paymentType === 'hourly') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { paymentType: 'houly' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'houly' }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                    else if (query.paymentType === 'fixed') {
                        totalJobs = yield JobPost_1.JobPostModel.countDocuments({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] });
                        totalPages = Math.ceil(totalJobs / page_size);
                        jobs = yield JobPost_1.JobPostModel.find({ $and: [{ status: "pending" }, { paymentType: 'fixed' }] })
                            .sort({
                            proposalCount: -1,
                        })
                            .skip(skip)
                            .limit(page_size);
                    }
                }
                if (!jobs)
                    throw new Error("No jobs found");
                return {
                    jobs,
                    totalPages,
                };
            }
            else if (jobType === "bestMatches") {
                let totalJobs, jobs, totalPages;
                const userSkills = user.skills;
                totalJobs = yield JobPost_1.JobPostModel.countDocuments({
                    $and: [
                        { status: "pending" },
                        { requiredSkills: { $elemMatch: { $in: userSkills } } },
                    ],
                });
                totalPages = Math.ceil(totalJobs / page_size);
                jobs = yield JobPost_1.JobPostModel.find({
                    $and: [
                        { status: "pending" },
                        { requiredSkills: { $elemMatch: { $in: userSkills } } },
                    ],
                })
                    .skip(skip)
                    .limit(page_size);
                if (!jobs || jobs.length === 0)
                    throw new Error("No matched job found ");
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
    closeContract(contractId, description, progress) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentContract = yield Contract_1.ContractModel.findByIdAndUpdate(contractId, {
                active: false,
                status: "closed",
            }, { update: true });
            if (!currentContract) {
                throw new Error("Contract not found");
            }
            const finalAmount = Math.round(currentContract.amount - (currentContract.amount * 10) / 100);
            const adminId = process.env.ADMIN_OBJECT_ID;
            const walletEntryUser = {
                type: "credit",
                amount: finalAmount,
                from: "admin",
                fromId: adminId,
                date: new Date(),
            };
            const updateUserWallet = yield User_1.UserModel.findByIdAndUpdate(currentContract.userId, {
                $inc: { "wallet.balance": finalAmount },
                $push: { "wallet.transactions": walletEntryUser },
            }, {
                new: true,
                upsert: false,
            }).lean().exec();
            if (!updateUserWallet)
                throw new Error('Wallet is not available');
            const walletEntryAdmin = {
                type: "debit",
                amount: finalAmount,
                from: "admin",
                fromId: process.env.ADMIN_OBJECT_ID,
                date: new Date(),
            };
            const updateAdminWallet = yield Admin_1.AdminModel.findByIdAndUpdate(adminId, {
                $inc: { "wallet.balance": -finalAmount },
                $push: { "wallet.transactions": walletEntryAdmin },
            }, {
                new: true,
                upsert: false,
            }).exec();
            if (!updateAdminWallet)
                throw new Error('Wallet is not available');
            return { updateUserWallet, updateAdminWallet };
        });
    }
    viewSingleContract(contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield Contract_1.ContractModel.findById(contractId);
            if (!contract)
                throw new Error("contract not found");
            return contract;
        });
    }
    viewContracts(userId, contractViewType, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_size = 3;
            const skip = (currentPage - 1) * page_size;
            let contract, totalContracts;
            if (contractViewType === "pending") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ userId: userId }, { status: "on progress" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ userId: userId }, { status: "on progress" }],
                })
                    .skip(skip)
                    .limit(page_size);
            }
            else if (contractViewType === "submitted") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ userId: userId }, { status: "submitted" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ userId: userId }, { status: "submitted" }],
                })
                    .skip(skip)
                    .limit(page_size);
            }
            else if (contractViewType === "rejected") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ userId: userId }, { status: "rejected" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ userId: userId }, { status: "rejected" }],
                })
                    .skip(skip)
                    .limit(page_size);
            }
            else if (contractViewType === "completed") {
                totalContracts = yield Contract_1.ContractModel.countDocuments({
                    $and: [{ userId: userId }, { status: "closed" }],
                });
                contract = yield Contract_1.ContractModel.find({
                    $and: [{ userId: userId }, { status: "closed" }],
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
    boostSuccess(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findByIdAndUpdate(userId, {
                isBoosted: true,
            }, {
                new: true,
            });
            if (!user)
                throw new Error("User not found");
            return user === null || user === void 0 ? void 0 : user.request;
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
    submitProject(contractId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const contract = yield Contract_1.ContractModel.findByIdAndUpdate(contractId, {
                status: "submitted",
            }, {
                update: true,
            }).lean();
            if (!contract)
                throw new Error('Contract not exists');
            const clientId = contract.clientId;
            const jobPostId = contract.jobPostId;
            const jobPost = yield JobPost_1.JobPostModel.findById(jobPostId).lean().exec();
            if (!jobPost)
                throw new Error('Jobpost doesnt exists');
            const submissionBody = {
                contractId: contractId,
                description: body.description,
                progress: body.progress,
                attachedFile: body.attachedFile,
                jobPostData: {
                    jobPostId: jobPost._id,
                    title: jobPost.title,
                    amount: jobPost.amount,
                },
                createdAt: new Date(),
            };
            const addRequestToClient = yield Client_1.ClientModel.findByIdAndUpdate(clientId, {
                $push: { projectSubmissions: submissionBody },
            }, {
                new: true,
            });
            return addRequestToClient;
        });
    }
    viewWallet(userId, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const page_size = 6;
            const skip = (currentPage - 1) * page_size;
            const theWallet = yield User_1.UserModel.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(userId) } },
                { $project: { totalTransactions: { $size: "$wallet.transactions" } } },
            ]);
            const totalTransactions = theWallet.length > 0 ? theWallet[0].totalTransactions : 0;
            const totalPages = Math.ceil(totalTransactions / page_size);
            const wallet = yield User_1.UserModel.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(userId) } },
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
                wallet,
                totalPages,
            };
        });
    }
    getAllInvites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundedInvites = yield Invite_1.InviteModel.find({
                $and: [{ userId: userId }, { status: "pending" }],
            });
            if (!foundedInvites)
                throw new Error("Invite not Found");
            return foundedInvites;
        });
    }
    rejectInvite(inviteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateInvite = yield Invite_1.InviteModel.updateOne({ _id: inviteId }, {
                status: "rejected",
            }, {
                new: true,
            }).lean();
            if (!updateInvite)
                throw new Error("Invite not Found");
            return updateInvite;
        });
    }
    searchJobsByTitle(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield JobPost_1.JobPostModel.find({
                title: { $regex: input, $options: "i" },
            });
            if (!jobs)
                throw new Error("No jobs found");
            return jobs;
        });
    }
    withdrawMoney(userId, amount, accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let userName;
            const user = yield User_1.UserModel.findById(userId).lean().exec();
            if (!user)
                throw new Error('user not exists');
            userName = user.name;
            const adminId = process.env.ADMIN_OBJECT_ID;
            if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid userId: Must be a 24-character hex string.");
            }
            const withdrawRequestObject = {
                roleType: 'user',
                roleId: new mongoose_1.default.Types.ObjectId(userId),
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
exports.UserRepositoryMongoose = UserRepositoryMongoose;
