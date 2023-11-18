const User = require("./user.model");

const UserService = {
  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async createUser(userData) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Implement other service methods getUserById, updateUser, deleteUser, etc.
};

module.exports = UserService;
