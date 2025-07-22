import mongoose from "mongoose";
import { INotification } from "../../../domain/entities/Notification";

//Notification Schema
const NotificationSchema: mongoose.Schema = new mongoose.Schema<INotification>({
    type: { type: String, required: false },
    message: { type: String, required: false },
    sender_id: { type: String, required: false },
    reciever_id: { type: String, required: false },
    newContract: {
        contractId: { type: String, required: false },
    },
    closeContract: {
        contractId: { type: String, required: false },
        userId: { type: String, required: false },
    },
    inviteSuccess: {
        userId: { type: String, required: false },
    },
    withdrawData: {
        paymentScreenshot: { type: String, required: false },
        amount: { type: Number, required: false },
        upiId: { type: Number, required: false },
    },

    createdAt: { type: Date, required: false },
});

//user model
export const NotificationModel = mongoose.model(
    "Notification",
    NotificationSchema
);
