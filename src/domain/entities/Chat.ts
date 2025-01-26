import mongoose, { Document, Schema, model } from 'mongoose';

export interface Chat extends Document{
    members: [String],
    createdAt: Date
}


const ChatSchema: Schema = new Schema({ 
 
    members: {
        type: [
            {type: mongoose.Types.ObjectId}
        ]
    },
    createdAt: {type: Date, required: true}
});



export const ChatModel = model('Chat', ChatSchema);