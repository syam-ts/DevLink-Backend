import mongoose, { Model, Schema } from "mongoose";
import { IContractDocument } from "../../../domain/entities/Contract";

const ContractSchema = new Schema<IContractDocument>({
    clientId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    jobPostId: { type: mongoose.Types.ObjectId, required: true },
    userData: { type: Schema.Types.Mixed, required: true },
    clientData: { type: Schema.Types.Mixed, required: true },
    jobPostData: { type: Schema.Types.Mixed, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
    status: { type: String, required: true, default: "on progress" },
    createdAt: { type: Date, required: true },
});

export const ContractModel: Model<IContractDocument> =
    mongoose.model<IContractDocument>("Contract", ContractSchema);
