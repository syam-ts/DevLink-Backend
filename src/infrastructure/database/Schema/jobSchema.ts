import mongoose, { Model, Schema } from "mongoose";
import { IJobPostDocument } from "../../../domain/entities/JobPost";

export const JobPostSchema = new Schema<IJobPostDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keyResponsiblities: { type: [String], required: true },
    requiredSkills: { type: [String], required: true },
    estimateTime: { type: Number, required: false },
    estimateTimeinHours: { type: Number, required: false },
    paymentType: { type: String, required: false },
    amount: { type: Number, required: false },
    expertLevel: { type: String, required: false },
    location: { type: String, required: false },
    projectType: { type: String, required: false },
    maxProposals: { type: Number, required: false },
    proposalCount: { type: Number, required: false },
    aboutClient: { type: {}, required: false },
    status: { type: String, required: true },
    isPayment: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const JobPostModel: Model<IJobPostDocument> =
    mongoose.model<IJobPostDocument>("JobPost", JobPostSchema);
