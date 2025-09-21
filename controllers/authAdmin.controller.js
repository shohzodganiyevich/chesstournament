const { sendErrorResponse } = require("../helpers/send.error.response");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwtService = require("../services/jwt.service");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        401
      );
    }
    const verifyPassword = await bcrypt.compare(password, admin.password);
    if (!verifyPassword) {
      return sendErrorResponse(
        { message: "Email yoki parol noto'g'ri" },
        res,
        401
      );
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.token = hashedRefreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Admin logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookie refresh token topilmadi" },
        res,
        400
      );
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    const admin = await Admin.findByPk(verifiedRefreshToken.id);
    admin.token = null;
    await admin.save();

    res.clearCookie("refreshToken");
    res.send({
      message: "Admin logged out",
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refresh token topilmadi" },
        res,
        400
      );
    }
    const verifiedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );

    const admin = await Admin.findByPk(verifiedRefreshToken.id);

    const compareRefreshToken = await bcrypt.compare(refreshToken, admin.token);

    if (!compareRefreshToken) {
      return sendErrorResponse(
        { message: "Refresh token noto'g'ri" },
        res,
        400
      );
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const tokens = jwtService.generateTokens(payload);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    admin.token = hashedRefreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).send({
      message: "Tokens refreshed",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
    } = req.body;

    const isHasAdmin = await Admin.findOne({ where: { email } });
    if (isHasAdmin) {
      return sendErrorResponse({ message: "Bunday admin mavjud!" }, res, 403);
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newAdmin = await Admin.create({
      first_name,
      last_name,
      email,
      password: hashed_password,
      phone_number,
    });
    res.status(201).json({ message: "New Admin added", data: newAdmin });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
  register,
};
