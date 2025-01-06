import mongoose, { Schema , Model} from 'mongoose';


interface JobPostDocument extends Document {
    title: string;
    clientId: string
    description: string;
    keyResponsiblities: [string],
    requiredSkills: [string],
    paymentType: 'hourly' | 'fixed',
    amount: number,
    estimateTime: Date;
    status: 'on progress' | 'finished';
    isPayment: boolean;
    date: Date;
    jobProposals?: mongoose.Types.ObjectId;
  };
  
  const JobPostSchema = new Schema<JobPostDocument>({
    title: { type: String, required: true },
    clientId: {type: String, required: true},
    description: { type: String, required: true },
    keyResponsiblities: { type: [String], required: true },
    requiredSkills: { type: [String], required: true },
    paymentType: { type: String, required: true },
    amount: { type: Number, required: true },
    estimateTime: { type: Date, required: false },
    status: { type: String, required: true },
    date: { type: Date, required: true },
    isPayment: { type: Boolean, required: true },
  });
  
  export const JobPostModel: Model<JobPostDocument> = mongoose.model<JobPostDocument>('JobPost', JobPostSchema);
  