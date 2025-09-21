

const authadminRoutes = require("./authAdmin.routes");
const adminRoutes = require("./admin.routes");

const routes = require("express").Router();

routes.use("/admin", authadminRoutes);
routes.use("/admin", adminRoutes);


module.exports = routes;
