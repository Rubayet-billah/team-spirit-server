const { Router } = require("express");
const router = Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllDomains,
} = require("./user.controller");

// Define routes and their respective controller methods
router.get("/get-domains", getAllDomains);
router.post("/", createUser);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);

module.exports = { UserRouter: router };
