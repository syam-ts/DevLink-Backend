import mongoose from "mongoose";

export interface Admin extends mongoose.Document { 
    name: string;
    password?: string;
   totalWithdrawals: [{
    amount: number
    createdAt: Date
   }], 
    grossAmount: [{
        amount: number
        createdAt: Date
    }],
    request: [
        {
            type: string;
            clientId: mongoose.Types.ObjectId;
            status: "pending" | "approved" | "rejected";
            data?: [];
        }
    ];
    withdrawRequest: [
        {
            roleId: mongoose.Types.ObjectId;
            userName: string;
            amount: number;
            accountNumber: string;
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
}

const WithdrawRequestSchema = new mongoose.Schema({
    roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userName: {type: String, required: true},
    amount: { type: Number, required: true },
    accountNumber: { type: String, required: true },
    createdAt: { type: Date },
});


const RevenueSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    createdAt: { type: Date },
});


//Admin Schema
export const AdminSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: false },
    password: { type: String, required: false },
    totalWithdrawals: [RevenueSchema],  
    grossAmount: [RevenueSchema],
    request: [
        {
            type: { type: String, required: false },
            clientId: { type: mongoose.Types.ObjectId, required: false },
            status: { type: String, required: false },
            data: { type: mongoose.Schema.Types.Mixed, required: false },
        },
    ],
    withdrawRequest: [WithdrawRequestSchema],
    wallet: {
        balance: { type: Number, required: false },
        transactions: [
            {
                type: Array,
            },
        ],
    },
});

//Admin model
export const AdminModel = mongoose.model("Admin", AdminSchema);
