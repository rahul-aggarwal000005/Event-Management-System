const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getAllUser,
  updateUser,
  deleteUser,
  logout,
} = require("../controllers/userController");
const {
  isAdminAuthenticated,
  isAuthenticated,
  isNotAuthenticated,
} = require("../middlewares/auth");

router.post("/login", isNotAuthenticated, login);
router.put("/users", isAdminAuthenticated, updateUser);
router.delete("/users", isAdminAuthenticated, deleteUser);
router.get("/users", isAdminAuthenticated, getAllUser);
router.post("/register", isNotAuthenticated, register);
router.post("/logout", isAuthenticated, logout);

module.exports = router;
