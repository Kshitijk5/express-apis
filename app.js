import express from "express";
import morgan from "morgan";
import { userController } from "./controllers/userController.js";
import dotenv from "dotenv";

export const app = express();

//config
dotenv.config({ path: `./config.env` });
app.use(morgan("dev"));
app.use(express.json());

//routes
// user route
app.use("/users", userController);
