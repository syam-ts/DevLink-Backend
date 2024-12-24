import mongoose from 'mongoose'; 

export interface Notification extends mongoose.Document{
    id?: string;
    type: string;
    message: string;
    sender: mongoose.Schema.Types.ObjectId;
    reciever: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

//Notification Schema
const NotificationSchema: mongoose.Schema = new mongoose.Schema({
    type: {type: String, required: false},
    message: {type: String, required: false},
    sender: {type: mongoose.Schema.Types.ObjectId, required: false},
    reciever: {type: mongoose.Schema.Types.ObjectId, required: false},
    createdAt: {type: Date, required: false}, 
});

//user model
export const NotificationModel = mongoose.model("Notification", NotificationSchema);


 