import express, { NextFunction, Request, Response } from "express";
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(__dirname, '.env')
})

 
import logger from './logger/logger'
import cors from "cors";
import cookieparser from "cookie-parser";
import http from "node:http";
import morgan from "morgan";
import routes from "./infrastructure/http/routes";
import { connectDB } from "./infrastructure/database/db";
import initializeSocket from "./infrastructure/socket/socket";

const app = express();
//pushing all logs to info
app.use((req: Request, res: Response, next: NextFunction) => {  
    logger.info(`route: ${req.url}`); 
  next();
}); 

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev")); 
app.use("/", routes);

const server = http.createServer(app); 
initializeSocket(server);

console.log('The monog URI: ',process.env.MONGO_URI)
console.log('The Stripe Secret Key: ',process.env.STRIPE_SECRET_KEY)

const PORT = (process.env.PORT as string) || 3000;

(async () => {
  await connectDB();
  server.listen(PORT, () =>  console.log(`Server running on port ${PORT}`))
})();
