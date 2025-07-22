import mongoose, { Schema } from "mongoose";

 const MessageSchema: Schema = new Schema(
    {
        senderId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        roleType: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const MessageModel = mongoose.model("Message", MessageSchema);
