import mongoose from 'mongoose'; 
require('dotenv').config();

 
const MONGO_URI: string  = process.env.MONGO_URI as string;

export const connectDB = async () => {
    try {
        
      await mongoose.connect(MONGO_URI);  
        console.log('Database Connection established');
    } catch (err: any) {
        console.error('Failed to Connect Database', err);
    }
};

