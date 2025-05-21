import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.use(protectRoute);

messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/users", getUsersForSidebar);
messageRouter.get("/:id", getMessages);
export default messageRouter;
