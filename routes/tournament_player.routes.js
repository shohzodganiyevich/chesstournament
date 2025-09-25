const {
  getAllTournamentPlayers,
  addTournamentPlayer,
  updateTournamentPlayer,
  deleteTournamentPlayer,
  getOneTournamentPlayerByID,
} = require("../controllers/tournament_player.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllTournamentPlayers);
router.post("/", addTournamentPlayer);
router.patch("/:id", updateTournamentPlayer);
router.delete("/:id", deleteTournamentPlayer);
router.get("/:id", getOneTournamentPlayerByID);

module.exports = router;
