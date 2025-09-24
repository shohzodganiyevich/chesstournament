const { sendErrorResponse } = require("../helpers/send.error.response");
const ChessType = require("../models/chess_type");

const getAllChessTypes = async (req, res) => {
  try {
    const allChessType = await ChessType.findAll();
    res.status(200).json({ message: "All ChessTypes", data: allChessType });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addChessType = async (req, res) => {
  try {
    const { category, base_time_minutes, increment_seconds, describtion } =
      req.body;

    const newChessType = await ChessType.create({
      category,
      base_time_minutes,
      increment_seconds,
      describtion,
    });
    res
      .status(201)
      .json({ message: "New ChessType added", data: newChessType });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateChessType = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, base_time_minutes, increment_seconds, describtion } =
      req.body;

   
    const editChessType = await ChessType.update(
      {
        category,
        base_time_minutes,
        increment_seconds,
        describtion,
      },
      { where: { id }, returning: true }
    );
    res
      .status(201)
      .json({ message: "A chess type edited", data: editChessType[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteChessType = async (req, res) => {
  try {
    const id = req.params.id;
    const checkChessType = await ChessType.findByPk(id);
    if (!checkChessType) {
      return res.status(201).json({ message: "This ChessType Id not found" });
    }
    await ChessType.destroy({ where: { id } });
    res.status(201).json({ message: "A ChessType deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneChessTypeByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneChessType = await ChessType.findByPk(id);
    res.status(201).json({ message: "A ChessType", data: oneChessType });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllChessTypes,
  addChessType,
  updateChessType,
  deleteChessType,
  getOneChessTypeByID,
};
