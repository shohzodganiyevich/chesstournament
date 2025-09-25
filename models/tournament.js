const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const ChessType = require("./chess_type");

const Tournament = sequelize.define("tournament", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rounds_number: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

ChessType.hasMany(Tournament);
Tournament.belongsTo(ChessType);

module.exports = Tournament;
