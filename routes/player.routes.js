const {
  getAllPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
  getOnePlayerByID,
} = require("../controllers/player.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllPlayers);
router.post("/", addPlayer);
router.patch("/:id", updatePlayer);
router.delete("/:id", deletePlayer);
router.get("/:id", getOnePlayerByID);

module.exports = router;
