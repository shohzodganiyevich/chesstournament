const {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdminByID,
} = require("../controllers/admin.controller");
const admin_authGuard = require("../middlewares/guards/admin_auth.guard");

const router = require("express").Router();

router.get("/", getAllAdmins);
router.post("/",  admin_authGuard, addAdmin);
router.patch("/:id",  admin_authGuard, updateAdmin);
router.delete("/:id", admin_authGuard, deleteAdmin);
router.get("/:id", admin_authGuard, getOneAdminByID);

module.exports = router;
