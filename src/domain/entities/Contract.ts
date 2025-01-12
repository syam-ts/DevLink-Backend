import mongoose, { Schema , Model} from 'mongoose';


interface ContractDocument extends Document {
    userId?: mongoose.Types.ObjectId;
    clientId?: mongoose.Types.ObjectId; 
    jobPostData: Schema.Types.Mixed;
    amount: number;
    deduction: number;
    created: Date;
    deadline: Date; 
    active: Boolean;
    status: 'on progress' | 'finished'; 
  };
  
  const ContractSchema = new Schema<ContractDocument>({
    userId: {type: mongoose.Types.ObjectId, required: true},
    clientId: {type:mongoose.Types.ObjectId, required: true}, 
    jobPostData: {type: Schema.Types.Mixed, required: true},
    amount: {type: Number, required: true},
    deduction: {type: Number, required: true}, 
    created: { type: Date, required: true },
    deadline: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true },
    status: { type: String, required: true , default: 'on progress'},
  });
  
  export const ContractModel: Model<ContractDocument> = mongoose.model<ContractDocument>('Contract', ContractSchema);
  