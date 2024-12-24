import mongoose from 'mongoose'; 

export interface Post extends mongoose.Document{
    id?: string;
    clientId: mongoose.Schema.Types.ObjectId;
    description: string;
    amount: 'hourly' | 'fixed';
    payment: 'success' | 'failed'
}

//Post Schema
const PostSchema: mongoose.Schema = new mongoose.Schema({ 
    clientId: {type: mongoose.Schema.Types.ObjectId, required: false},
    description: {type: String, required: false},
    amount: {type: Number, required: false},
    payment: {type: String, required: false},
});

//user model
export const PostModel = mongoose.model("Post", PostSchema);


 