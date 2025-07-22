 
import { IJobPostDocument } from "./JobPost";

interface IRevenue {
  amount: number;
  createdAt: Date;
}

interface IWithdrawRequest {
  roleType: string;
  roleId: string;
  userName: string;
  amount: number;
  accountNumber: string;
  createdAt: Date;
}

interface ITransaction {
  type: "credit" | "debit";
  amount: number;
  from: string;
  fromId: string;
  createdAt: Date;
}

interface IRequest {
  type?: string;
  clientId?: string;
  status?: "pending" | "approved" | "rejected";
  data?: IJobPostDocument;
  unChangedData?: IJobPostDocument;
}

export interface IAdmin {
  _id?: string;
  name?: string;
  password?: string;
  revenue: {
    totalWithdrawals: IRevenue[];
    grossAmount: IRevenue[];
  };
  withdrawRequest: IWithdrawRequest[];
  wallet: {
    balance: number;
    transactions: ITransaction[];
  };
  request: Request[];
}

