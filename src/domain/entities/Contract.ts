import mongoose, { Schema, Model } from 'mongoose';


 export interface ContractDocument extends Document {
  clientId?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  jobPostId?: mongoose.Types.ObjectId;
  clientData: Schema.Types.Mixed;
  userData: Schema.Types.Mixed;
  jobPostData: Schema.Types.Mixed;
  amount: number;
  deadline: number;
  active: Boolean;
  status: 'on progress' | 'pending' | 'submitted' | 'closed';
  createdAt: Date;
};

 

const ContractSchema = new Schema<ContractDocument>({
  clientId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  jobPostId: { type: mongoose.Types.ObjectId, required: true },
  userData: { type: Schema.Types.Mixed, required: true },
  clientData: { type: Schema.Types.Mixed, required: true },
  jobPostData: { type: Schema.Types.Mixed, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Number, required: true },
  active: { type: Boolean, required: true, default: true },
  status: { type: String, required: true, default: 'on progress' },
  createdAt: { type: Date, required: true },
});

export const ContractModel: Model<ContractDocument> = mongoose.model<ContractDocument>('Contract', ContractSchema);
