import mongoose, { Document, Schema, model } from 'mongoose';
import { MessageSchema } from './Message';



export interface Chat extends Document {
    members:[];
    messages?: []
         
      
};



const ChatSchema: Schema = new Schema({
  
    members: [
      {
        type: mongoose.Types.ObjectId,
         ref: "User", 
         rquired: true
        }
      ], 
        
    messages: [MessageSchema]
});



export const ChatModel = model('Chat', ChatSchema);