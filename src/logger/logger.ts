import devlinkLogger from "./devlinkLogger";

let logger: any;

if (process.env.NODE_ENV === "production") {
    logger = devlinkLogger();
} else {
    logger = {
        info: (...args: any[]) => console.log("[INFO]", ...args),
        error: (...args: any[]) => console.error("[ERROR]", ...args),
        warn: (...args: any[]) => console.warn("[WARN]", ...args),
        debug: (...args: any[]) => console.debug("[DEBUG]", ...args),
    };
}

export default logger;
