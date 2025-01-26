import mongoose, { Schema, Document } from 'mongoose';


export interface Message extends Document {
     chatId: mongoose.Types.ObjectId,
     sender: mongoose.Types.ObjectId,
     text: String,
     read: Boolean
};



const MessageSchema: Schema = new Schema({

    chatId: {type: mongoose.Types.ObjectId, required: true, ref: "chats"},
    sender: {type: mongoose.Types.ObjectId, required: true},
    text: {type: String, required: true},
    read: {type: Boolean, default: false},

});


export const MessageModel = mongoose.model('Message', MessageSchema);

