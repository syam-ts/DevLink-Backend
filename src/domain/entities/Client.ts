import { IUser } from "./User";

export interface IClient {
    length?: number;
    companyName?: string;
    password?: string;
    email: string;
    description?: string;
    location?: string;
    numberOfEmployees: number;
    domain?: string;
    since?: number;
    totalJobs?: number;
    isVerified: boolean;
    isBlocked: boolean;
    isEditRequest: boolean;
    isGoogle?: boolean;
    proposals: [
        {
            type: string;
            UserId: string;
            jobPostId: string;
            jobPostInfo: string;
            userData: IUser;
            description?: string;
            status?: string;
            bidamount: number;
            bidDeadline: number;
            createdAt: Date;
        }
    ];
    wallet: {
        balance: { type: Number; required: false };
        transactions: [
            {
                type: [];
            }
        ];
    };
    projectSubmissions: [
        {
            contractId: string;
            description: String;
            progress: Number;
            attachedFile: String;
            jobPostData: {
                jobPostId: string;
                title: String;
                amount: Number;
            };
            createdAt: Date;
        }
    ];
    totalSpend: number;
    totalHours: number;
    createdAt: Date;
}
