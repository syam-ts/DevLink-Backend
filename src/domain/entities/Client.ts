import mongoose from 'mongoose';

export interface Client extends mongoose.Document{
    id?: string;
    name: string;
    password?: string;
    email: string;
}

//Client Schema
const ClientSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true, unique: true }
});

//Cliet model
export const ClientModel = mongoose.model("Client", ClientSchema);