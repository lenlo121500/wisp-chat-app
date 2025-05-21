import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";

import logger from "./utils/logger.js";
import authRouter from "./routes/auth.route.js";
import connectDB from "./config/mongodb.js";
import errorHandler from "./middlewares/errorHandler.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./config/socket.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { apiLimiter } from "./middlewares/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src/docs/swagger.json"))
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

app.use(apiLimiter);
// routes here
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use(errorHandler);

server.listen(PORT, async () => {
  try {
    await connectDB();
    logger.info(`Server running on port ${PORT}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
});
