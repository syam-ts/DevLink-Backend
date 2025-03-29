import express from "express";
require("dotenv").config();
import cors from "cors";
import cookieparser from "cookie-parser";
import http from "node:http";
import morgan from "morgan";
import routes from "./infrastructure/http/routes";
import { connectDB } from "./infrastructure/database/db";
import initializeSocket from "./infrastructure/socket/socket";

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use("/", routes);

const server = http.createServer(app);

initializeSocket(server);

const PORT = (process.env.PORT as string) || 3000;

(async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
