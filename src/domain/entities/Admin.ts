import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
});

const WithdrawRequestSchema = new mongoose.Schema({
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
