import mongoose from 'mongoose';
import { Post } from './JobPost'

export interface Admin extends mongoose.Document{ 
    name: string;
    password?: string;
    request: [{
        type: string,
        clientId: mongoose.Types.ObjectId,
        status: 'pending' | 'approved' | 'rejected',
        data?: Post
    } ]
}

//Admin Schema
export const AdminSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: false },
    password: { type: String, required: false },
    request: [{
        type: {type: String, required: false},
        clientId: {type: mongoose.Types.ObjectId, required: false},
        status: {type: String, required: false}, 
        data: { type: mongoose.Schema.Types.Mixed, required: false }
    }]
});

//Admin model
export const AdminModel = mongoose.model("Admin", AdminSchema);