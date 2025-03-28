import mongoose, { Schema , Model, Document} from 'mongoose';


export interface JobPostDocument extends Document {
    title: string;
    description: string;
    keyResponsiblities: [string],
    requiredSkills: [string],
    estimateTime: string;
    estimateTimeinHours: number;
    paymentType: 'hourly' | 'fixed',
    amount: number,
    expertLevel: 'beginner' | 'intermediate' | 'advanced';
    location: string;
    projectType: 'ongoing project' | 'project updation';
    maxProposals: number; 
    proposalCount: number;
    aboutClient: {
      companyName: string,
      location: string,
      totalSpend: number,
      totalHours: number,
      domain: string,
      numberOfEmployees: number,
      joined: Date
    }
    status: 'on progress' | 'finished';
    isPayment: boolean;
    createdAt: Date;
    clientId?: mongoose.Schema.Types.ObjectId;  
  };
  

  export const JobPostSchema = new Schema<JobPostDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keyResponsiblities: { type: [String], required: true },
    requiredSkills: { type: [String], required: true },
    estimateTime: { type: String, required: false },
    estimateTimeinHours: { type: Number, required: false },
    paymentType: { type: String, required: false },
    amount: { type: Number, required: false },
    expertLevel: { type: String, required: false },
    location: { type: String, required: false },
    projectType: { type: String, required: false },
    maxProposals: { type: Number, required: false },
    proposalCount: { type: Number, required: false },
    aboutClient: {type: {}, required: false}, 
    status: { type: String, required: true },
    isPayment: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    clientId: {type: mongoose.Schema.Types.ObjectId, required: true},
  });

  
  export const JobPostModel: Model<JobPostDocument> = mongoose.model<JobPostDocument>('JobPost', JobPostSchema);
  