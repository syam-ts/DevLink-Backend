"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Notification Schema
const NotificationSchema = new mongoose_1.default.Schema({
    type: { type: String, required: false },
    message: { type: String, required: false },
    sender_id: { type: String, required: false },
    reciever_id: { type: String, required: false },
    newContract: {
        contractId: { type: String, required: false }
    },
    closeContract: {
        contractId: { type: String, required: false },
        userId: { type: String, required: false }
    },
    inviteSuccess: {
        userId: { type: String, required: false }
    },
    withdrawData: {
        paymentScreenshot: { type: String, required: false },
        amount: { type: Number, required: false },
        upiId: { type: Number, required: false },
    },
    createdAt: { type: Date, required: false },
});
//user model
exports.NotificationModel = mongoose_1.default.model("Notification", NotificationSchema);
