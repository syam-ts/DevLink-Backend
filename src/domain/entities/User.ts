import mongoose from 'mongoose';

export interface User extends mongoose.Document{
    id?: string;
    username: string;
    password: string;
    mobile?: number;
    email: string;
}

//User Schema
const UserSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: false },
    email: { type: String, required: true, unique: true }
});

//user model
export const UserModel = mongoose.model("User", UserSchema);