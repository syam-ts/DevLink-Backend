import express, { NextFunction, Request, Response } from "express";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({
    path: path.resolve(__dirname, ".env"),
});
import logger from "./logger/logger";
import cors from "cors";
import cookieparser from "cookie-parser";
import http from "node:http";
import morgan from "morgan";
import routes from "./presentation/express-http/routes";
import initializeSocket from "./infrastructure/socket/socket";
import Database from "./infrastructure/database/db";

class Server {
    private app: express.Application;
    private port: number;
    private frontendUrl: string;
    private corsMethods: string[];
    private database: Database;
    constructor() {
        dotenv.config({
            path: ".env",
        }),
            (this.app = express());
        this.port = parseInt(process.env.PORT || "3000");
        this.frontendUrl =
            process.env.FRONTEND_ORIGIN || "https://dev-link-frontend.vercel.app";
        this.corsMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
        this.configureMiddlewaresAndLogger();
        this.loggerConfigs();
        this.configuredRoute();
        this.database = new Database();
    }

    public configureMiddlewaresAndLogger(): void {
        //pushing all logs to info
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            logger.info(`route: ${req.url}`);
            next();
        });

        this.app.use(express.json());
        this.app.use(cookieparser());
        this.app.use(
            cors({
                origin: this.frontendUrl,
                methods: this.corsMethods,
                credentials: true,
            })
        );
    }

    public loggerConfigs(): void {
        this.app.use(morgan("dev"));
    }

    private configuredRoute(): void {
        this.app.use("/", routes);
    }

    private async connectToDatabase(): Promise<void> {
        await this.database.connect();
    }

    public start(): void {
        const server = http.createServer(this.app);
        initializeSocket(server);
        server.listen(this.port, async (): Promise<void> => {
            this.connectToDatabase();
            console.log(
                `Server listening to port ${this.port
                } on ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} `
            );
        });
    }
}

export default Server;
