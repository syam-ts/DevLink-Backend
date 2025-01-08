import mongoose, { Schema , Model} from 'mongoose';


interface ContractDocument extends Document {
    userId?: mongoose.Types.ObjectId;
    clientId?: mongoose.Types.ObjectId
    jobPostId?: mongoose.Types.ObjectId; 
    amount: number,
    deduction: number,
    created: Date;
    deadline: Date; 
    status: 'on progress' | 'finished'; 
  };
  
  const ContractSchema = new Schema<ContractDocument>({
    userId: {type: mongoose.Types.ObjectId, required: true},
    clientId: {type:mongoose.Types.ObjectId, required: true},
    jobPostId: {type:mongoose.Types.ObjectId, required: true},
    amount: {type: Number, required: true},
    deduction: {type: Number, required: true}, 
    created: { type: Date, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, required: true },
  });
  
  export const ContractModel: Model<ContractDocument> = mongoose.model<ContractDocument>('JobPost', ContractSchema);
  