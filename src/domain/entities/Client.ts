import mongoose from 'mongoose';

export interface Client extends mongoose.Document{
    id?: string;
    name: string;
    password?: string;
    email: string;
    companyName?:string;
    description?:string;
    location?: string;
    requiredSkills?: [string],
    totalEmployees: number,
    domain?: string;
    since?: number,
    totalJobs?: number,
    isVerified:boolean,
    isEditRequest: boolean,
    isGoogle?: boolean,
      request: [{
            type: string,
            UserId: mongoose.Types.ObjectId,
            description?: string
        }],
        wallet: {
            balance: {type: Number, required: false}, 
            transactions: [
                {
                    type: String,
                    amount: Number,
                    from: String,
                    fromId: mongoose.Types.ObjectId,
                    date: Date
                }
            ]
        }
}

//Client Schema
const ClientSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: false },
    companyName: { type: String, required: false },
    description: { type: String, required: false },
    requiredSkills: { type: [String], required: false },
    totalEmployees: { type: Number, required: false },
    since: {type: Number, required: false },
    totalJobs: { type: Number, required: false},
    isVerified: { type: Boolean, required: false},
    isEditRequest: { type: Boolean, required: false},
    isGoogle: { type: Boolean, required: false},
    request: [
              {
            type: {type: String, required: false},
            userId: {type: mongoose.Types.ObjectId, required: false}, 
            description: { type: String, required: false }
             }
        ],
        wallet: {
            balance: {type: Number, required: false}, 
            transactions: [
                {
                    type: String,
                    amount: Number,
                    from: String,
                    fromId: mongoose.Types.ObjectId,
                    date: Date
                }
            ]
        }
   
});

//Cliet model
export const ClientModel = mongoose.model("Client", ClientSchema);