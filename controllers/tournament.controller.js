const { sendErrorResponse } = require("../helpers/send.error.response");
const Tournament = require("../models/tournament");

const getAllTournaments = async (req, res) => {
  try {
    const allTournament = await Tournament.findAll();
    res.status(200).json({ message: "All Tournaments", data: allTournament });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addTournament = async (req, res) => {
  try {
    const {
      name,
      address,
      location,
      start_date,
      end_date,
      status,
      rounds_number,
    } = req.body;

    const newTournament = await Tournament.create({
      name,
      address,
      location,
      start_date,
      end_date,
      status,
      rounds_number,
    });
    res.status(201).json({
      message: "New Tournament added",
      data: newTournament,
    });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      location,
      start_date,
      end_date,
      status,
      rounds_number,
    } = req.body;
    const editTournament = await Tournament.update(
      {
        name,
        address,
        location,
        start_date,
        end_date,
        status,
        rounds_number,
      },
      { where: { id }, returning: true }
    );
    res
      .status(201)
      .json({ message: "A Tournament edited", data: editTournament[1][0] });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteTournament = async (req, res) => {
  try {
    const id = req.params.id;
    const checkTournament = await Tournament.findByPk(id);
    if (!checkTournament) {
      return res.status(201).json({ message: "This Tournament Id not found" });
    }
    await Tournament.destroy({ where: { id } });
    res.status(201).json({ message: "A Tournament deleted", data: id });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneTournamentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const oneTournament = await Tournament.findByPk(id);
    res.status(201).json({ message: "A Tournament", data: oneTournament });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};
module.exports = {
  getAllTournaments,
  addTournament,
  updateTournament,
  deleteTournament,
  getOneTournamentByID,
};
