"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.AdminSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RevenueSchema = new mongoose_1.default.Schema({
    amount: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
});
const WithdrawRequestSchema = new mongoose_1.default.Schema({
    roleType: { type: String, required: true },
    roleId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    accountNumber: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
});
const TransactionSchema = new mongoose_1.default.Schema({
    type: { type: String, enum: ["credit", "debit"], required: true },
    amount: { type: Number, required: true },
    from: { type: String, required: true },
    fromId: { type: mongoose_1.default.Types.ObjectId, required: true },
    createdAt: { type: Date, required: true, default: Date.now, index: true },
});
exports.AdminSchema = new mongoose_1.default.Schema({
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
            clientId: { type: mongoose_1.default.Types.ObjectId, required: false },
            status: {
                type: String,
                enum: ["pending", "approved", "rejected"],
                required: false,
            },
            data: { type: mongoose_1.default.Schema.Types.Mixed, required: false },
            unChangedData: { type: mongoose_1.default.Schema.Types.Mixed, required: false },
        },
    ],
});
exports.AdminModel = mongoose_1.default.model("Admin", exports.AdminSchema);
