"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, errors, json } = winston_1.format;
//logs deletes in 7 days interval
const devlinkLogger = () => {
    return (0, winston_1.createLogger)({
        level: "info",
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),
        transports: [
            new winston_daily_rotate_file_1.default({
                filename: "src/logger/logs/error.log",
                datePattern: "YYYY-MM-DD",
                level: "error",
                maxFiles: "7d",
                zippedArchive: true,
            }),
            new winston_daily_rotate_file_1.default({
                filename: "src/logger/logs/info.log",
                datePattern: "YYYY-MM-DD",
                level: "info",
                maxFiles: "7d",
                zippedArchive: true,
            }),
            new winston_daily_rotate_file_1.default({
                filename: "src/logger/logs/combined.log",
                datePattern: "YYYY-MM-DD",
                maxFiles: "7d",
                zippedArchive: true,
            }),
        ],
    });
};
exports.default = devlinkLogger;
