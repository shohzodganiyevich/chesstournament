const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getOneUserByID,
} = require("../controllers/user.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getOneUserByID);

module.exports = router;
