import mongoose from 'mongoose'; 
require('dotenv').config();

 
const MONGO_URI: string  = 'mongodb+srv://syamnandhu3:AUZcKAsIJHM5phLC@cluster0.ukj87.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async () => {
    try {
        
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000, 
        socketTimeoutMS: 45000,
        tlsAllowInvalidCertificates: true
    });   
        console.log('Database Connection established');
    } catch (err: any) {
        console.error('Failed to Connect Database', err);
    }
};

