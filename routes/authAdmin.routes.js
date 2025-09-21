const {
  login,
  logout,
  refreshToken,
  register,
} = require("../controllers/authAdmin.controller");
const router = require("express").Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.post("/register", register);

module.exports = router;
