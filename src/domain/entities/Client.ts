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
    isGoogle?: boolean
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
    isGoogle: { type: Boolean, required: false}
   
});

//Cliet model
export const ClientModel = mongoose.model("Client", ClientSchema);