import express from "express";
require("dotenv").config();
import cors from "cors";
import cookieparser from "cookie-parser";
import routes from "./infrastructure/http/routes";
import { connectDB } from "./infrastructure/database/db";
import { app, server, io } from "./infrastructure/socket/socket";


app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use("/", routes);





const PORT: number = (process.env.PORT as any) || 3000;


(async () => {
    await connectDB();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })();

