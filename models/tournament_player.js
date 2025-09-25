const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Player = require("./player");
const Tournament = require("./tournament");

const TournamentPlayer = sequelize.define("tournament_player", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  current_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Player.hasMany(TournamentPlayer);
TournamentPlayer.belongsTo(Player);

Tournament.hasMany(TournamentPlayer);
TournamentPlayer.belongsTo(Tournament);

module.exports = TournamentPlayer;
