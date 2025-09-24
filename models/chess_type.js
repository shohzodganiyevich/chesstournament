const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const ChessType = sequelize.define("chess_type", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.ENUM("bullet", "blitz", "rapid", "correspondence"),
    allowNull: false,
  },
  base_time_minutes: {
    type: DataTypes.ENUM("1", "2", "3", "5", "10", "15", "30"),
    allowNull: false,
  },
  increment_seconds: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  describtion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = ChessType;
