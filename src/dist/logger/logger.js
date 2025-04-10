"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devlinkLogger_1 = __importDefault(require("./devlinkLogger"));
let logger;
if (process.env.NODE_ENV === "production") {
    logger = (0, devlinkLogger_1.default)();
}
else {
    logger = {
        info: (...args) => console.log("[INFO]", ...args),
        error: (...args) => console.error("[ERROR]", ...args),
        warn: (...args) => console.warn("[WARN]", ...args),
        debug: (...args) => console.debug("[DEBUG]", ...args),
    };
}
exports.default = logger;
