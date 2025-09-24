const { sendErrorResponse } = require("../helpers/send.error.response");
const Player = require("../models/player");
const bcrypt = require("bcrypt");

const getAllPlayers = async (req, res) => {
  try {
    const allPlayer = await Player.findAll();
    res.status(200).json({ message: "All Players", data: allPlayer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addPlayer = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      phone_number,
    } = req.body;

    const isHasPlayer = await Player.findOne({ where: { email } });
    if (isHasPlayer) {
      return sendErrorResponse({ message: "Bunday player mavjud!" }, res, 403);
    }

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 8);
    const newPlayer = await Player.create({
      first_name,
      last_name,
      email,
      password: hashed_password,
      phone_number,
    });
    res.status(201).json({ message: "New Player added", data: newPlayer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      confirm_password,
    } = req.body;

    if (password != confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas!" }, res, 400);
    }
    const editPlayer = await Player.update(
      {
        first_name,
        last_name,
        email,
        password,
        phone_number,
      },
      { where: { id }, returning: true }
    );
    res.status(201).json({ message: "A player edited", data: editPlayer[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deletePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    const checkPlayer = await Player.findByPk(id);
    if (!checkPlayer) {
      return res.status(201).json({ message: "This Player Id not found" });
    }
    await Player.destroy({ where: { id } });
    res.status(201).json({ message: "A Player deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOnePlayerByID = async (req, res) => {
  try {
    const { id } = req.params;
    const onePlayer = await Player.findByPk(id);
    res.status(201).json({ message: "A Player", data: onePlayer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
  getOnePlayerByID,
};
