import devlinkLogger from "./devlinkLogger";

let logger: any;

if (process.env.NODE_ENV === "production") {
    logger = devlinkLogger();
}

export default logger;
