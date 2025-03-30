"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Client Schema
const ClientSchema = new mongoose_1.default.Schema({
    companyName: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: false },
    domain: { type: String, required: false },
    description: { type: String, required: false },
    numberOfEmployees: { type: Number, required: false },
    since: { type: Number, required: false },
    totalJobs: { type: Number, required: false },
    isBlocked: { type: Boolean, required: false },
    isVerified: { type: Boolean, required: false },
    isEditRequest: { type: Boolean, required: false },
    isGoogle: { type: Boolean, required: false },
    proposals: [
        {
            type: { type: String, required: false },
            userId: { type: mongoose_1.default.Types.ObjectId, required: false },
            jobPostId: { type: mongoose_1.default.Types.ObjectId, required: false },
            jobPostInfo: { type: String, required: false },
            userData: {},
            description: { type: String, required: false },
            status: { type: String, required: false },
            bidAmount: { type: Number, required: false },
            bidDeadline: { type: Number, required: false },
            createdAt: { type: Date, required: false },
        }
    ],
    wallet: {
        balance: { type: Number, required: false },
        transactions: [{
                type: Array
            }]
    },
    projectSubmissions: [
        {
            contractId: { type: mongoose_1.default.Types.ObjectId, required: false },
            description: { type: String, required: false },
            progress: { type: Number, required: false },
            attachedFile: { type: String, required: false },
            jobPostData: {
                jobPostId: { type: mongoose_1.default.Types.ObjectId, required: false },
                title: { type: String, required: false },
                amount: { type: Number, required: false }
            },
            createdAt: { type: Date, required: false }
        }
    ],
    totalSpend: { type: Number, required: false },
    totalHours: { type: Number, required: false },
    createdAt: { type: Date, required: false }
});
//Cliet model
exports.ClientModel = mongoose_1.default.model("Client", ClientSchema);
