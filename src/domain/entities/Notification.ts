import mongoose from "mongoose";

export interface Notification extends mongoose.Document {
    type: string;
    message: string;
    sender_id: string;
    reciever_id: string;
    extra?: {
        documentId: mongoose.Types.ObjectId;
    };
    withdrawData: {
        paymentScreenshot: string;
        amount: number;
        upiId: number;
    };
    createdAt?: Date;
}

//Notification Schema
const NotificationSchema: mongoose.Schema = new mongoose.Schema({
    type: { type: String, required: false },
    message: { type: String, required: false },
    sender_id: { type: String, required: false },
    reciever_id: { type: String, required: false },
    extra: {
        documentId: { type: mongoose.Types.ObjectId, required: false },
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
