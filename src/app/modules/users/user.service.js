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

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
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

  async updateUser(userId, updatedUserData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = UserService;
