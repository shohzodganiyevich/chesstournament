const {
  getAllRounds,
  addRound,
  updateRound,
  deleteRound,
  getOneRoundByID,
} = require("../controllers/round.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllRounds);
router.post("/", addRound);
router.patch("/:id", updateRound);
router.delete("/:id", deleteRound);
router.get("/:id", getOneRoundByID);

module.exports = router;
