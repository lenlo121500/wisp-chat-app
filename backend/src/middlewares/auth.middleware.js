import jwt from "jsonwebtoken";
import APIError from "../utils/APIError.js";
import User from "../models/auth.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new APIError("Unauthrized - No Token Provided", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new APIError("Unauthorized - Invalid Token", 401));
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return next(new APIError("Unauthorized - User Not Found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(`Error in protectRoute: ${error.message}`);
    next(error);
  }
};
