import { IClient } from "../entities/Client";
import { IContractDocument } from "../entities/Contract";
import { IUser, IWallet } from "./IUserRepository";

export interface IAdminRepository {
    findAdmin(
        name: string,
        password: string
    ): Promise<{ _id: undefined | string }>;

    findAllUsers(): Promise<IUser[]>;

    getAllUsers(
        page: number,
        sortType: string
    ): Promise<{ users: IUser[]; totalPages: number }>;
    getAllClients(
        page: number,
        sortType: string
    ): Promise<{ clients: IClient[]; totalPages: number }>;

    viewWallet(
        currentPage: number
    ): Promise<{ adminWallet: IWallet[]; totalPages: number }>;

    sortUser(
        sortingType: string
    ): Promise<{ users: IUser[]; totalPages: number }>;

    sortClients(
        sortingType: string
    ): Promise<{ clients: IClient[]; totalPages: number }>;
    findAllClients(): Promise<IClient[]>;

    blockUser(userId: string): Promise<IUser>;

    unBlockUser(userId: string): Promise<IUser>;

    blockClient(clientId: string): Promise<IClient>;

    unBlockClient(clientId: string): Promise<IClient>;

    verifyAccept(data: {
        clientId: string;
        editData: {
            editData: IClient;
            isVerified: boolean;
            isEditRequest: boolean;
        };
    }): Promise<unknown>;
    getAllRequests(): Promise<unknown>;

    findClient(clientId: string): Promise<IClient>;

    viewRoleInfo(roleId: string, roleInfo: string): Promise<unknown>;

    getWallet(adminId: string): Promise<unknown>;

    getAllContracts(): Promise<IContractDocument>;

    successMoneyTransfer(
        roleType: string,
        userId: string,
        paymentScreenshot: string,
        amount: number,
        upiId: number,
        requestId: string
    ): Promise<unknown>;

    getWithdrawRequests(): Promise<unknown>;
    viewContracts(currentPage: number): Promise<{
        contracts: IContractDocument[];
        totalPages: number;
    }>;

    viewSingleContract(contractId: string): Promise<IContractDocument>;
    userMetrics(): Promise<{
        totalUsers: number;
        verifiedUsers: number;
        boostedUsers: number;
        totalJobs: number;
    }>;
    clientMetrics(): Promise<{
        totalClients: number;
        verifiedClients: number;
        totalJobs: number;
    }>;

    getRevenue(range: "weekly" | "monthly" | "yearly"): Promise<unknown>;
}
