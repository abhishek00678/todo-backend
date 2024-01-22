import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();
config({
  path: "./database/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
