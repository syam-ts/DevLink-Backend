"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devlinkLogger_1 = __importDefault(require("./devlinkLogger"));
let logger = null;
if (process.env.NODE_ENV === "production") {
    logger = (0, devlinkLogger_1.default)();
}
exports.default = logger;
