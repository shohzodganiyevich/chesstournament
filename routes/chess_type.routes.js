const {
  getAllChessTypes,
  addChessType,
  updateChessType,
  deleteChessType,
  getOneChessTypeByID,
} = require("../controllers/chess_type.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllChessTypes);
router.post("/", addChessType);
router.patch("/:id", updateChessType);
router.delete("/:id", deleteChessType);
router.get("/:id", getOneChessTypeByID);

module.exports = router;
