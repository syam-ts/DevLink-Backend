import mongoose from 'mongoose'; 

export interface Notification extends mongoose.Document{
    id?: string;
    type: string;
    message: string;
    sender_id: string;
    reciever_id: string;
    createdAt?: Date;
}

//Notification Schema
const NotificationSchema: mongoose.Schema = new mongoose.Schema({
    type: {type: String, required: false},
    message: {type: String, required: false},
    sender_id: {type: String, required: false},
    reciever_id: {type: String, required: false},
    createdAt: {type: Date, required: false}, 
});

//user model
export const NotificationModel = mongoose.model("Notification", NotificationSchema);


 