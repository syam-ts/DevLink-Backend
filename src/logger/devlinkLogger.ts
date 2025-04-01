import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

 
const {combine, timestamp, errors, json } = format;

//logs deletes in 7 days interval
const devlinkLogger = () => {
    return createLogger({
        level: "info",  
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),  
            json()   
        ),
        transports: [
            new DailyRotateFile({
                filename: "src/logger/logs/error.log",
                datePattern: "YYYY-MM-DD",
                level: "error",
                maxFiles: "7d", 
                zippedArchive: true,  
            }), 
            new DailyRotateFile({
                filename: "src/logger/logs/info.log",
                datePattern: "YYYY-MM-DD",
                level: "info",
                maxFiles: "7d", 
                zippedArchive: true,
            }), 
        
            new DailyRotateFile({
                filename: "src/logger/logs/combined.log",
                datePattern: "YYYY-MM-DD",
                maxFiles: "7d", 
                zippedArchive: true,
            }),
        ],
    });
};

export default devlinkLogger;
