const authadminRoutes = require("./authAdmin.routes");
const adminRoutes = require("./admin.routes");
const playerRoutes = require("./player.routes");
const chessTypeRoutes = require("./chess_type.routes");
const matchRoutes = require("./macht.routes");
const roundRoutes = require("./round.routes");
const tournamentPlayerRoutes = require("./tournament_player.routes");

const routes = require("express").Router();

routes.use("/admin", authadminRoutes);
routes.use("/admin", adminRoutes);
routes.use("/player", playerRoutes);
routes.use("/chess_type", chessTypeRoutes);
routes.use("/match", matchRoutes);
routes.use("/round", roundRoutes);
routes.use("/tournament_player", tournamentPlayerRoutes);

module.exports = routes;
