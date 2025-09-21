const { sendErrorResponse } = require("../../helpers/send.error.response");
const jwtService = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return sendErrorResponse({ message: "auth header not found" }, res, 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return sendErrorResponse({ message: "Token not found" }, res, 401);
    }
    const verifyAccessToken = await jwtService.verifyAccessToken(token);

    req.admin = verifyAccessToken;

    if (!req.admin.is_active) {
      return sendErrorResponse({ message: "Admin active emas" }, res, 401);
    }
    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
