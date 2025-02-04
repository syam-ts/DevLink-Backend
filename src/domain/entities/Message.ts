import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  senderId: mongoose.Types.ObjectId;
  roleType: String; 
  name?: String;
  text: String;
}

export const MessageSchema: Schema = new Schema(
  {
    senderId: {  
        type: mongoose.Types.ObjectId, 
         ref: "User",
         required: true 
        },
        roleType: {
          type: String,
          required: true
        }, 
        name: {
          type: String,
          required: true
        },
    text: {
         type: String,
          required: true
         },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", MessageSchema);
