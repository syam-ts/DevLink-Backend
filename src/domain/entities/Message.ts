import mongoose, { Schema, Document } from 'mongoose';


export interface Message extends Document {
     chatId: mongoose.Types.ObjectId,
     sender: mongoose.Types.ObjectId,
     text: String,
     read: Boolean
};



const MessageSchema: Schema = new Schema({

    chatId: {type: mongoose.Types.ObjectId, ref: "chats"},
    sender: {type: mongoose.Types.ObjectId},
    text: {type: String},
    read: {type: Boolean, default: false},

});


export const MessageModel = mongoose.model('Message', MessageSchema);

