const { Router } = require("express");
const router = Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("./user.controller");

// Define routes and their respective controller methods
router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = { UserRouter: router };
