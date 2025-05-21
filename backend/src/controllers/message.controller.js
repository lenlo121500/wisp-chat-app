import User from "../models/auth.model.js";
import logger from "../utils/logger.js";
import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId, io } from "../config/socket.js";

export const getUsersForSidebar = async (req, res, next) => {
  logger.info("Get users for sidebar controller hit...");
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: filteredUsers,
    });
  } catch (error) {
    logger.error(`Error in getUsersForSidebar controller: ${error.message}`);
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  logger.info("Get messages controller hit...");
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    logger.error(`Error in getMessages controller: ${error.message}`);
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  logger.info("Send message controller hit...");
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    logger.error(`Error in sendMessage controller: ${error.message}`);
    next(error);
  }
};
