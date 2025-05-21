import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.use(protectRoute);

messageRouter.get("/:id", getMessages);
messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/users", getUsersForSidebar);

export default messageRouter;
