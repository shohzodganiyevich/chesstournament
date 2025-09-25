const { sendErrorResponse } = require("../helpers/send.error.response");
const TournamentPlayer = require("../models/tournament_player");

const getAllTournamentPlayers = async (req, res) => {
  try {
    const allTournamentPlayer = await TournamentPlayer.findAll();
    res
      .status(200)
      .json({ message: "All TournamentPlayers", data: allTournamentPlayer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addTournamentPlayer = async (req, res) => {
  try {
    const { current_score, rank } = req.body;

    const newTournamentPlayer = await TournamentPlayer.create({
      current_score,
      rank,
    });
    res
      .status(201)
      .json({
        message: "New TournamentPlayer added",
        data: newTournamentPlayer,
      });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateTournamentPlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_score, rank } = req.body;
    const editTournamentPlayer = await TournamentPlayer.update(
      {
        current_score,
        rank,
      },
      { where: { id }, returning: true }
    );
    res
      .status(201)
      .json({ message: "A TournamentPlayer edited", data: editTournamentPlayer[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteTournamentPlayer = async (req, res) => {
  try {
    const id = req.params.id;
    const checkTournamentPlayer = await TournamentPlayer.findByPk(id);
    if (!checkTournamentPlayer) {
      return res
        .status(201)
        .json({ message: "This TournamentPlayer Id not found" });
    }
    await TournamentPlayer.destroy({ where: { id } });
    res.status(201).json({ message: "A TournamentPlayer deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneTournamentPlayerByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneTournamentPlayer = await TournamentPlayer.findByPk(id);
    res
      .status(201)
      .json({ message: "A TournamentPlayer", data: oneTournamentPlayer });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllTournamentPlayers,
  addTournamentPlayer,
  updateTournamentPlayer,
  deleteTournamentPlayer,
  getOneTournamentPlayerByID,
};
