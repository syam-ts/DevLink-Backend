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
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_http_1 = __importDefault(require("node:http"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./infrastructure/http/routes"));
const db_1 = require("./infrastructure/database/db");
const socket_1 = __importDefault(require("./infrastructure/socket/socket"));
console.log('all dotenv: ',process.env)
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use("/", routes_1.default);
const server = node_http_1.default.createServer(app);
(0, socket_1.default)(server);
const PORT = process.env.PORT || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectDB)();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}))();
