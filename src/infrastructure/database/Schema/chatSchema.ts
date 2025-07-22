import mongoose, { model, Schema } from "mongoose";
import { IChat } from "../../../domain/entities/Chat";
import { IMessage } from "../../../domain/entities/Message";

const ChatSchema: Schema = new Schema<IChat>({
  
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
        
    messages: []
});



export const ChatModel = model('Chat', ChatSchema);