const authadminRoutes = require("./authAdmin.routes");
const adminRoutes = require("./admin.routes");
const playerRoutes = require("./player.routes");
const chessTypeRoutes = require("./chess_type.routes");

const routes = require("express").Router();

routes.use("/admin", authadminRoutes);
routes.use("/admin", adminRoutes);
routes.use("/player", playerRoutes);
routes.use("/chess_type", chessTypeRoutes);

module.exports = routes;
