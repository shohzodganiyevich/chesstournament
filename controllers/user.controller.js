const { sendErrorResponse } = require("../helpers/send.error.response");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.findAll();
    res.status(200).json({ message: "All Users", data: allUser });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addUser = async (req, res) => {
  try {
    const { full_name, username, email, password, confirm_password } = req.body;

    const isHasUser = await User.findOne({ where: { email } });
    if (isHasUser) {
      return sendErrorResponse({ message: "Bunday user mavjud!" }, res, 403);
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newUser = await User.create({
      full_name,
      username,
      email,
      password: hashed_password,
    });
    res.status(201).json({ message: "New User added", data: newUser });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      username,
      email,
      password,
      confirm_password,
    } = req.body;

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }
    const editUser = await User.update(
      {
        full_name,
        username,
        email,
        password,
      },
      { where: { id }, returning: true }
    );
    res.status(201).json({ message: "A user edited", data: editUser[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const checkUser = await User.findByPk(id);
    if (!checkUser) {
      return res.status(201).json({ message: "This User Id not found" });
    }
    await User.destroy({ where: { id } });
    res.status(201).json({ message: "A User deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneUser = await User.findByPk(id);
    res.status(201).json({ message: "A User", data: oneUser });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getOneUserByID,
};
