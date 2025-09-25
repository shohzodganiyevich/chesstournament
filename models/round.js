const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Tournament = require("./tournament");

const Round = sequelize.define("round", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  round_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Tournament.hasMany(Round);
Round.belongsTo(Tournament);

module.exports = Round;
