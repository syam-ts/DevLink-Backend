import mongoose, { Document, Schema, model } from 'mongoose';
import { MessageSchema } from './Message'; 

export interface Chat extends Document {
    members:[];
    membersData:[];
    messages?: [] 
};
 

const ChatSchema: Schema = new Schema({
  
    members: [
      {
        type: mongoose.Types.ObjectId,
         ref: "User", 
         required: true
        }
      ], 
    userData: 
      {
        userName: {type: String },
        profilePicture: {type: String }, 
        },  
    clientData: 
      {
        companyName: {type: String },
        profilePicture: {type: String }, 
        },  
        
    messages: [MessageSchema]
});



export const ChatModel = model('Chat', ChatSchema);