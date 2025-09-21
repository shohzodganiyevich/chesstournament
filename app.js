const express = require("express");
const config = require("config");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = config.get("port") ?? 3030;
const sequelize = require("./config/db");
const mainRoute = require("./routes");


app.use("/api", mainRoute);


async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
