import APIError from "../utils/APIError.js";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      return next(new APIError(messages, 400));
    }
    next();
  };
};

export default validateRequest;
