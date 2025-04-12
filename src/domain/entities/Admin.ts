 
import mongoose, { Types } from "mongoose";
import { JobPostDocument } from "./JobPost";

interface Revenue {
  amount: number;
  createdAt: Date;
}

interface WithdrawRequest {
  roleType: string;
  roleId: Types.ObjectId;
  userName: string;
  amount: number;
  accountNumber: string;
  createdAt: Date;
}

interface Transaction {
  type: "credit" | "debit";
  amount: number;
  from: string;
  fromId: Types.ObjectId;
  createdAt: Date;
}

interface Request {
  type?: string;
  clientId?: Types.ObjectId;
  status?: "pending" | "approved" | "rejected";
  data?: JobPostDocument;
  unChangedData?: JobPostDocument;
}

export interface Admin {
  _id?: Types.ObjectId;
  name?: string;
  password?: string;
  revenue: {
    totalWithdrawals: Revenue[];
    grossAmount: Revenue[];
  };
  withdrawRequest: WithdrawRequest[];
  wallet: {
    balance: number;
    transactions: Transaction[];
  };
  request: Request[];
}


const RevenueSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
});

const WithdrawRequestSchema = new mongoose.Schema({
   roleType: {type: String, required: true},
    roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    accountNumber: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});

 const TransactionSchema = new mongoose.Schema({
    type: { type: String, enum: ["credit", "debit"], required: true },
    amount: { type: Number, required: true },
    from: { type: String, required: true },
    fromId: { type: mongoose.Types.ObjectId, required: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
});

export const AdminSchema = new mongoose.Schema({
    name: { type: String, required: false },
    password: { type: String, required: false },
    revenue: {
        totalWithdrawals: [RevenueSchema],
        grossAmount: [RevenueSchema],
    },
    withdrawRequest: [WithdrawRequestSchema],
    wallet: {
        balance: { type: Number, required: false, default: 0 },
        transactions: [TransactionSchema],
    },

    request: [
        {
            type: { type: String, required: false },
            clientId: { type: mongoose.Types.ObjectId, required: false },
            status: {
                type: String,
                enum: ["pending", "approved", "rejected"],
                required: false,
            },
            data: { type: mongoose.Schema.Types.Mixed, required: false },
            unChangedData: { type: mongoose.Schema.Types.Mixed, required: false },
        },
    ],
});

export const AdminModel = mongoose.model("Admin", AdminSchema);
