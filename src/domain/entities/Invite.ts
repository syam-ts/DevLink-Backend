import mongoose, { Schema, Model } from "mongoose";

interface JobPostData {
    _id: string;
    title: string;
    description: string;
    expertLevel: "beginner" | "intermediate" | "advanced";
    location: string;
    requiredSkills: string[];
    amount: number;
    paymentType: "hourly" | "fixed";
    estimateTimeinHours: Number;
    projectType: "ongoing project" | "project updation";
}

interface ClientData {
    companyName: string;
    email: string;
    location: string;
}

export interface InviteDocument extends Document {
    userId?: mongoose.Types.ObjectId;
    clientId?: mongoose.Types.ObjectId;
    description: String;
    jobPostData?: JobPostData;
    clientData: ClientData;
    status: "pending" | "rejected";
    createdAt: Date;
}

const InviteSchema = new Schema<InviteDocument>({
    userId: { type: mongoose.Types.ObjectId, required: true },
    clientId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true },
    jobPostData: {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        expertLevel: { type: String, required: false },
        location: { type: String, required: false },
        requiredSkills: { type: [String], required: true },
        amount: { type: Number, required: false },
        paymentType: { type: String, required: false },
        estimateTimeinHours: { type: Number, required: false },
        projectType: { type: String, required: false },
    },
    clientData: {
        companyName: { type: String, required: true },
        email: { type: String, required: true },
        location: { type: String, required: false },
    },
    status: { type: String, required: true, default: "pending" },
    createdAt: { type: Date, required: true },
});

export const InviteModel: Model<InviteDocument> =
    mongoose.model<InviteDocument>("Invite", InviteSchema);
