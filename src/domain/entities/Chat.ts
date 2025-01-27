import mongoose, { Document, Schema, model } from 'mongoose';


export interface Chat extends Document {
    members: 
        {
            clientId: mongoose.Types.ObjectId,
            clientName: String
       
            userId: mongoose.Types.ObjectId,
            userName: String
        },
       chatHistory?: {
        clientChat: [ {text: String, createdAt: Date}],
        userChat: [ {text: String, createdAt: Date}],
 
       },
     
    createdAt: Date
};


const ChatSchema: Schema = new Schema({

    members:  
            {
                clientId: { type: mongoose.Types.ObjectId },
                clientName: { type: String },
          
                userId: { type: mongoose.Types.ObjectId , required: true},
                userName: { type: String }
            },
            chatHistory: {
                clientChat: [
                  {
                    text: { type: String, required: false },
                    createdAt: { type: Date, required: false },
                  },
                ],
                userChat: [
                  {
                    text: { type: String, required: false },
                    createdAt: { type: Date, required: false },
                  },
                ],
              },
        
    createdAt: { type: Date, required: true }
});



export const ChatModel = model('Chat', ChatSchema);