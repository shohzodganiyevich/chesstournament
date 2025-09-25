const {
  getAllTournaments,
  addTournament,
  updateTournament,
  deleteTournament,
  getOneTournamentByID,
} = require("../controllers/tournament.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllTournaments);
router.post("/", addTournament);
router.patch("/:id", updateTournament);
router.delete("/:id", deleteTournament);
router.get("/:id", getOneTournamentByID);

module.exports = router;
