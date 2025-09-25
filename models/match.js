const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Round = require("./round");
const TournamentPlayer = require("./tournament_player");

const Match = sequelize.define("match", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  board_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ent_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pgn: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Round.hasMany(Match);
Match.belongsTo(Round);

TournamentPlayer.hasMany(Match);
Match.belongsTo(TournamentPlayer);

module.exports = Match;
