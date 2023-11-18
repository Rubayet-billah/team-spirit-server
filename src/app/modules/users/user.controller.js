const {
  getAllUsers: _getAllUsers,
  createUser: _createUser,
} = require("./user.service");

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await _getAllUsers();
      res.json(users);
      res.json("hi there");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await _createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = UserController;
