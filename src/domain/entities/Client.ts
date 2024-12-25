import mongoose from 'mongoose';

export interface Client extends mongoose.Document{
    id?: string;
    name: string;
    password?: string;
    email: string;
    location?: string;
    domain?: string;
    companyFoundYear?: number
}

//Client Schema
const ClientSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: false },
    domain: {type: String, required: false},
    since: {type: Number, required: false },
    totalJobs: { type: Number, required: false}
   
});

//Cliet model
export const ClientModel = mongoose.model("Client", ClientSchema);