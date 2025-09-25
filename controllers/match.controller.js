const { sendErrorResponse } = require("../helpers/send.error.response");
const Match = require("../models/match");

const getAllMatchs = async (req, res) => {
  try {
    const allMatch = await Match.findAll();
    res.status(200).json({ message: "All Matchs", data: allMatch });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addMatch = async (req, res) => {
  try {
    const { result, board_number, start_time, ent_time, pgn } = req.body;

    const newMatch = await Match.create({
      result,
      board_number,
      start_time,
      ent_time,
      pgn,
    });
    res.status(201).json({ message: "New Match added", data: newMatch });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { result, board_number, start_time, ent_time, pgn } = req.body;
    const editMatch = await Match.update(
      {
        result,
        board_number,
        start_time,
        ent_time,
        pgn,
      },
      { where: { id }, returning: true }
    );
    res.status(201).json({ message: "A match edited", data: editMatch[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteMatch = async (req, res) => {
  try {
    const id = req.params.id;
    const checkMatch = await Match.findByPk(id);
    if (!checkMatch) {
      return res.status(201).json({ message: "This Match Id not found" });
    }
    await Match.destroy({ where: { id } });
    res.status(201).json({ message: "A Match deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneMatchByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneMatch = await Match.findByPk(id);
    res.status(201).json({ message: "A Match", data: oneMatch });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllMatchs,
  addMatch,
  updateMatch,
  deleteMatch,
  getOneMatchByID,
};
