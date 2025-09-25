const { sendErrorResponse } = require("../helpers/send.error.response");
const Round = require("../models/round");

const getAllRounds = async (req, res) => {
  try {
    const allRound = await Round.findAll();
    res.status(200).json({ message: "All Rounds", data: allRound });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addRound = async (req, res) => {
  try {
    const { round_number, status, start_time, end_time } = req.body;

    const newRound = await Round.create({
      round_number,
      status,
      start_time,
      end_time,
    });
    res.status(201).json({ message: "New Round added", data: newRound });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateRound = async (req, res) => {
  try {
    const { id } = req.params;
    const { round_number, status, start_time, end_time } = req.body;
    const editRound = await Round.update(
      {
        round_number,
        status,
        start_time,
        end_time,
      },
      { where: { id }, returning: true }
    );
    res.status(201).json({ message: "A round edited", data: editRound[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteRound = async (req, res) => {
  try {
    const id = req.params.id;
    const checkRound = await Round.findByPk(id);
    if (!checkRound) {
      return res.status(201).json({ message: "This Round Id not found" });
    }
    await Round.destroy({ where: { id } });
    res.status(201).json({ message: "A Round deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneRoundByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneRound = await Round.findByPk(id);
    res.status(201).json({ message: "A Round", data: oneRound });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllRounds,
  addRound,
  updateRound,
  deleteRound,
  getOneRoundByID,
};
