"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: node_path_1.default.resolve(__dirname, ".env"),
});
const logger_1 = __importDefault(require("./logger/logger"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_http_1 = __importDefault(require("node:http"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./infrastructure/http/routes"));
const db_1 = require("./infrastructure/database/db");
const socket_1 = __importDefault(require("./infrastructure/socket/socket"));
class Server {
    constructor() {
        dotenv_1.default.config({
            path: ".env",
        }),
            this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "3000");
        this.frontendUrl =
            process.env.FRONTEND_ORIGIN || "https://dev-link-frontend.vercel.app";
        this.corsMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
        this.configureMiddlewaresAndLogger();
        this.loggerConfigs();
        this.configuredRoute();
        this.connectToDatabase();
    }
    configureMiddlewaresAndLogger() {
        //pushing all logs to info
        this.app.use((req, res, next) => {
            logger_1.default.info(`route: ${req.url}`);
            next();
        });
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: this.frontendUrl,
            methods: this.corsMethods,
            credentials: true,
        }));
    }
    loggerConfigs() {
        this.app.use((0, morgan_1.default)("dev"));
    }
    configuredRoute() {
        this.app.use("/", routes_1.default);
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, db_1.connectDB)();
            console.log("Database Connected Successfully");
        });
    }
    start() {
        const server = node_http_1.default.createServer(this.app);
        (0, socket_1.default)(server);
        server.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
            this.connectToDatabase();
            console.log(`Server listening to port ${this.port} on ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} `);
        }));
    }
}
exports.default = Server;
