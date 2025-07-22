import mongoose from "mongoose";
import { IClient } from "../entities/Client";
import { IJobPostDocument } from "../entities/JobPost";
import { IContractDocument } from "../entities/Contract";

export interface IUser {
    role?: string;
    _id: string;
    name: string;
    email: string;
    password: string;
    mobile: number;
    skills: string[];
    profilePicture: string;
    location: string;
    description: string;
    experience: string;
    education: string;
    budget: number;
    rating: number;
    domain: string;
    githubLink: string;
    totalJobs: number;
    totalHours: number;
    whyHireMe: string;
    completedJobs: string;
    inProgress: string;
    review?: [
        {
            theReview: string;
            rating: number;
            companyName: string;
        }
    ];
    workHistory: string[];
    isEditRequest: boolean;
    isProfileFilled: boolean;
    request: string[];
    wallet: string[];
    isBlocked: boolean;
    isBoosted: boolean;
    createdAt: string;
    [key: string]: string[] | number | string | boolean | Object | undefined;
}

export interface IWallet {
    balance: number;
    transactions: {
        type: string;
        amount: number;
        from: string;
        fromId: string;
        createdAt: Date;
    };
}

export interface IProposal {
    type: string;
    UserId: mongoose.Types.ObjectId;
    jobPostId: mongoose.Types.ObjectId;
    jobPostInfo: string;
    userData: IUser;
    description?: string;
    status?: string;
    bidamount: number;
    bidDeadline: number;
    createdAt: Date;
}

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;

    signupUser(email: string): Promise<IUser | null>;

    verifyOtp(user: {
        mailOtp: string;
        userOtp: string;
        user: {
            data: {
                name: string;
                email: string;
                password: string;
                mobile: number;
            };
        };
    }): Promise<IUser>;

    findUserById(userId: string): Promise<IUser>;

    findUserByEmail(email: string): Promise<IUser | null>;

    findUserByEmailAndPassword(
        email: string,
        passwordUser: string
    ): Promise<IUser>;

    findUserByOnlyEmail(
        email: string,
        name: string,
        password: string
    ): Promise<IUser>;

    findAllClients(): Promise<IClient[]>;

    resetPassword(userId: string, password: string): Promise<string>;

    alterUserProfile(
        userId: string,
        userData: { editData: IUser; unchangedData: IUser },
        type: string
    ): Promise<{ user: IUser }>;

    viewProposals(userId: string): Promise<IProposal[]>;

    createProposal(
        userId: string,
        jobPostId: string,
        description: string,
        bidAmount: number,
        bidDeadline: number
    ): Promise<{ proposal: IClient; notification: unknown }>;

    listHomeJobs(type: string): Promise<{
        latestJobs?: IJobPostDocument[];
        allJobs?: IJobPostDocument[];
        totalJobs?: number;
        totalHours?: unknown;
        verifiedAccounts?: number;
    }>;

    getSelectedJobs(
        userId: string,
        jobType: string,
        query: {
            amount: number;
            paymentType: "hourly" | "fixed";
            expertLevel: "beginner" | "intermediate" | "advanced";
        },
        currentPage: number
    ): Promise<{
        jobs: IJobPostDocument[];
        totalPages: number | undefined;
    }>;

    closeContract(
        contractId: string,
        description: string,
        progress: number
    ): Promise<{ updateUserWallet: IUser; updateAdminWallet: unknown }>;

    viewSingleContract(contractId: string): Promise<IContractDocument>;

    viewContracts(
        userId: string,
        contractViewType: string,
        currentPage: number
    ): Promise<{ contract: IContractDocument[]; totalPages: number }>;

    boostSuccess(userId: string): Promise<unknown>;

    getSingleJobPost(jobPostId: string): Promise<IJobPostDocument>;

    submitProject(
        contractId: string,
        body: { description: string; progress: number; attachedFile: string }
    ): Promise<unknown>;

    viewWallet(
        userId: string,
        currentPage: number
    ): Promise<{ wallet: IWallet[]; totalPages: number }>;

    searchJobsBySkills(input: string): Promise<IJobPostDocument[]>;

    withdrawMoney(
        userId: string,
        amount: number,
        accountNumber: number
    ): Promise<void>;
}
