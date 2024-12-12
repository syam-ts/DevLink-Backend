import mongoose from 'mongoose'; 
require('dotenv').config();

 
const mongoUri: string | undefined  = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        mongoUri === undefined ? 
      console.error('environment variable is undefined') :
      await mongoose.connect("mongodb+srv://syamnandhu3:AUZcKAsIJHM5phLC@cluster0.ukj87.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");  
        console.log('Database Connection established');
    } catch (err: any) {
        console.error('Failed to Connect Database', err);
    }
}