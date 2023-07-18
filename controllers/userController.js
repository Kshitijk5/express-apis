import express from "express";
import * as userService from "../services/userService.js";
import * as userMiddleware from "../middlewares/usermiddlewares.js";
import { jwtAuth } from "../middlewares/JwtAuth.js";
export const userController = express.Router();

userController
  .route("/login")
  .post(userMiddleware.userloginMiddleware, userService.loginUser);

userController.use(jwtAuth);

userController
  .route("/")
  .get(userService.getAllUsers)
  .post(userMiddleware.savingValidation, userService.saveUser);

userController.param("id", userMiddleware.userIdValidation);

userController
  .route("/:id")
  .get(userService.getUserById)
  .delete(userService.deleteById);
