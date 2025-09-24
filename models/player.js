const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Player = sequelize.define("player", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  describtion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Player;
