import mongoose, { Schema , Model} from 'mongoose';


interface JobPostDocument extends Document {
    title: string;
    description: string;
    keyResponsiblities: [string],
    requiredSkills: [string],
    paymentType: 'hourly' | 'fixed',
    ifFixed?: {
      is: boolean,
      amount: number
    };
    ifHourly?: {
      is: boolean,
      amount: number
    };
    estimateTime: Date;
    status: 'on progress' | 'finished';
    payment: boolean;
    jobProposals?: mongoose.Types.ObjectId;
  };
  
  const JobPostSchema = new Schema<JobPostDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keyResponsiblities: { type: [String], required: true },
    requiredSkills: { type: [String], required: true },
    paymentType: { type: String, required: true },
    ifFixed: { type: String, required: false },
    ifHourly: { type: String, required: false },
    estimateTime: { type: Date, required: false },
    status: { type: String, required: true },
    payment: { type: Boolean, required: true },
  });
  
  export const JobPostModel: Model<JobPostDocument> = mongoose.model<JobPostDocument>('JobPost', JobPostSchema);
  