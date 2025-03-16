import mongoose from "mongoose";

export interface Notification extends mongoose.Document {
    type: string;
    message: string;
    sender_id: string;
    reciever_id: string; 
    newContract: {
        contractId: string
    }
    closeContract: {
        contractId: string
        userId: string
    }
    inviteSuccess: {
        userId: string
    }
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
    newContract: {
        contractId: {type: String, required: false}
    },
    closeContract: {
        contractId: {type: String, required: false},
        userId: {type: String, required: false}
    },
    inviteSuccess: {
        userId: {type: String, required: false}
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
