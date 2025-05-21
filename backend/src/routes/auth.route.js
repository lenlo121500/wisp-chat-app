import express from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  signupUser,
  updateProfile,
} from "../controllers/auth.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import { signupSchema, loginSchema } from "../validators/auth.validator.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { sensitiveLimiter } from "../middlewares/rateLimiter.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateRequest(signupSchema),
  sensitiveLimiter,
  signupUser
);
authRouter.post(
  "/login",
  validateRequest(loginSchema),
  sensitiveLimiter,
  loginUser
);
authRouter.post("/logout", logoutUser);
authRouter.put(
  "/update-profile",
  protectRoute,
  sensitiveLimiter,
  updateProfile
);
authRouter.get("/check", protectRoute, checkAuth);

export default authRouter;
