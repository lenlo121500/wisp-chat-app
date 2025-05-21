import logger from "../utils/logger.js";
import APIError from "../utils/APIError.js";
import User from "../models/auth.model.js";
import { generateToken } from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

export const signupUser = async (req, res, next) => {
  logger.info("Signup controller hit...");
  try {
    const { fullName, email, password } = req.body;

    if (password.length < 8) {
      throw new APIError("Password must be at least 8 characters", 400);
    }

    // check existing user
    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      throw new APIError("User already exists", 400);
    }

    const newUser = new User({
      fullName,
      email,
      password, // already hashed in the user schema
    });

    if (newUser) {
      // generate token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } else {
      throw new APIError("Invalid user data", 400);
    }
  } catch (error) {
    logger.error(`Error in signupUser controller: ${error.message}`);
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  logger.info("Login controller hit...");
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      throw new APIError("Invalid credentials", 400);
    }
    generateToken(user._id, res);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    logger.error(`Error in loginUser controller: ${error.message}`);
    next(error);
  }
};
export const logoutUser = async (req, res, next) => {
  logger.info("Logout controller hit...");
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    logger.error(`Error in logoutUser controller: ${error.message}`);
    next(error);
  }
};

export const updateProfile = async (req, res) => {
  logger.info("Update profile controller hit...");
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      throw new APIError("Profile picture is required", 400);
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    logger.error(`Error in updateProfile controller: ${error.message}`);
    next(error);
  }
};

export const checkAuth = (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    logger.error(`Error in checkAuth controller: ${error.message}`);
    next(error);
  }
};
