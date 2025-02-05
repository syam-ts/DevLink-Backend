import mongoose from 'mongoose';
import { User } from './User'

export interface Client extends mongoose.Document{ 
    companyName?:string;
    password?: string;
    email: string;
    description?:string;
    location?: string;
    numberOfEmployees: number,
    domain?: string;
    since?: number,
    totalJobs?: number,
    isVerified:boolean,
    isBlocked: boolean,
    isEditRequest: boolean,
    isGoogle?: boolean,
    proposals: [{
            type: string,
            UserId: mongoose.Types.ObjectId,
            jobPostId: mongoose.Types.ObjectId,
            jobPostInfo: string,
            userData: User,
            description?: string,
            status?: string,
            bidamount: number,
            bidDeadline: number
        }],
        wallet: {
            balance: number, 
            transactions: [
                {
                    type: String,
                    amount: Number,
                    from: String,
                    fromId: mongoose.Types.ObjectId,
                    date: Date
                }
            ]
        },
        projectSubmissions: [
            {
                contractId:  mongoose.Types.ObjectId ,
                description: String, 
                progress: Number, 
                attachedFile: String,
                jobPostData: {
                 jobPostId: mongoose.Types.ObjectId,
                  title: String,
                  amount: Number
                } ,
                createdAt: Date
            }
        ],
        totalSpend: number,
        totalHours: number,
    createdAt: Date
}

//Client Schema
const ClientSchema: mongoose.Schema = new mongoose.Schema({ 
    companyName: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: false },
    domain: { type: String, required: false },
    description: { type: String, required: false },
    numberOfEmployees: { type: Number, required: false },
    since: {type: Number, required: false },
    totalJobs: { type: Number, required: false},
    isBlocked: { type: Boolean, required: false},
    isVerified: { type: Boolean, required: false},
    isEditRequest: { type: Boolean, required: false},
    isGoogle: { type: Boolean, required: false},
    proposals: [
              {
            type: {type: String, required: false},
            userId: {type: mongoose.Types.ObjectId, required: false}, 
            jobPostId: {type: mongoose.Types.ObjectId, required: false}, 
            jobPostInfo: {type: String, required: false}, 
            userData: {
               
            },
            description: { type: String, required: false },
            status: { type: String, required: false },
            bidAmount: { type: Number, required: false },
            bidDeadline: { type: Number, required: false }
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
        },
        projectSubmissions:  [
            {
                contractId: {type: mongoose.Types.ObjectId, required: false},
                description: {type: String, required: false},
                progress: {type: Number, required: false},
                attachedFile: {type: String, required: false},
                jobPostData: {
                    jobPostId:  {type: mongoose.Types.ObjectId, required: false},
                    title:  {type: String, required: false},
                    amount:  {type: Number, required: false}
                  },
                createdAt: {type: Date, required: false}
            }
            ] ,
        totalSpend: {type: Number, required: false},
        totalHours: {type: Number, required: false},
        createdAt: {type: Date, required: false}
});


//Cliet model
export const ClientModel = mongoose.model("Client", ClientSchema);