// logger.js
import winston from "winston";

// Define custom log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

winston.addColors(customLevels.colors);

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: combine(
    colorize({ all: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(timestamp(), errors({ stack: true }), logFormat),
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      format: combine(timestamp(), logFormat),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.level = "debug";
}

export default logger;
