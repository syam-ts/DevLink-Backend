import mongoose, { Schema, Model } from 'mongoose';

interface JobPostData {
    title: string;
    description: string;
    expertLevel: 'beginner' | 'intermediate' | 'advanced';
    location: string;
    requiredSkills: string[];
    amount: number,
    paymentType: 'hourly' | 'fixed',
    estimateTimeinHours: Number;
    projectType: 'ongoing project' | 'project updation';
};


interface InviteDocument extends Document {
    clientId?: mongoose.Types.ObjectId;
    userId?: mongoose.Types.ObjectId;
    description: String;
    jobPostData?: JobPostData;
    status: 'pending' | 'rejected';
    createdAt: Date;
};



const InviteSchema = new Schema<InviteDocument>({
    clientId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    description: {type: String, required: true},
    jobPostData: {
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
    status: { type: String, required: true, default: 'pending' },
    createdAt: { type: Date, required: true },
});

export const InviteModel: Model<InviteDocument> = mongoose.model<InviteDocument>('Invite', InviteSchema);
