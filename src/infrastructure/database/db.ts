import mongoose from "mongoose";
require("dotenv").config();

const MONGO_URI: string =
    "mongodb+srv://syamnandhu3:AUZcKAsIJHM5phLC@cluster0.ukj87.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

class Database {

    private mongo_uri: string;
    private serverSelectionTimeoutMS: number;
    private socketTimeoutMS: number;
    private tlsAllowInvalidCertificates: boolean;
    constructor() {

        this.mongo_uri = MONGO_URI;
        this.serverSelectionTimeoutMS = 5000;
        this.socketTimeoutMS = 45000;
        this.tlsAllowInvalidCertificates = true;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(MONGO_URI, {
                serverSelectionTimeoutMS: this.serverSelectionTimeoutMS,
                socketTimeoutMS: this.socketTimeoutMS,
                tlsAllowInvalidCertificates: this.tlsAllowInvalidCertificates,
            });
            console.log("Database Connection established");
        } catch (err: unknown) {
            console.error("Failed to Connect Database", err);
        }
    }
}


export default Database;