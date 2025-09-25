const {
  getAllMatchs,
  addMatch,
  updateMatch,
  deleteMatch,
  getOneMatchByID,
} = require("../controllers/match.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllMatchs);
router.post("/", addMatch);
router.patch("/:id", updateMatch);
router.delete("/:id", deleteMatch);
router.get("/:id", getOneMatchByID);

module.exports = router;
