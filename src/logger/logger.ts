import devlinkLogger from "./devlinkLogger";

let logger: any;

if (process.env.NODE_ENV === "production") {
    logger = devlinkLogger();
} else {
    logger = {
        info: (...args: string[]) => console.log("[INFO]", ...args),
        error: (...args: string[]) => console.error("[ERROR]", ...args),
        warn: (...args: string[]) => console.warn("[WARN]", ...args),
        debug: (...args: string[]) => console.debug("[DEBUG]", ...args),
    };
}

export default logger;
