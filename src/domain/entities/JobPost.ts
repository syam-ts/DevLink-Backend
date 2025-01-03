import mongoose, { Schema , Model} from 'mongoose';


interface JobPostDocument extends Document {
    title: string;
    clientId: mongoose.Types.ObjectId;
    description: string;
    keyResponsiblities: [string],
    requiredSkills: [string],
    paymentType: 'hourly' | 'fixed',
    amount: number,
    estimateTime: number;
    status: 'on progress' | 'finished';
    isPayment: boolean;
    jobProposals?: mongoose.Types.ObjectId;
  };
  
  const JobPostSchema = new Schema<JobPostDocument>({
    title: { type: String, required: true },
    clientId: {type: mongoose.Types.ObjectId, required: true},
    description: { type: String, required: true },
    keyResponsiblities: { type: [String], required: true },
    requiredSkills: { type: [String], required: true },
    paymentType: { type: String, required: true },
    amount: { type: Number, required: true },
    estimateTime: { type: Number, required: false },
    status: { type: String, required: true },
    isPayment: { type: Boolean, required: true },
  });
  
  export const JobPostModel: Model<JobPostDocument> = mongoose.model<JobPostDocument>('JobPost', JobPostSchema);
  