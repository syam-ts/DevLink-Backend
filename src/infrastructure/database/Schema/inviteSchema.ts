import mongoose, { Model, Schema } from "mongoose";
import { IInviteDocument } from "../../../domain/entities/Invite";

const InviteSchema = new Schema<IInviteDocument>({
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

export const InviteModel: Model<IInviteDocument> =
    mongoose.model<IInviteDocument>("Invite", InviteSchema);
