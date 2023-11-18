const helperFunctions = require("../../../helpers/helperFunctions");
const User = require("./user.model");

const UserService = {
  async getAllUsers(queryParams) {
    try {
      let filter = {};
      let sort = {};
      let search = {};

      // Implement filtering by domain, gender, and available
      if (queryParams.domain) {
        filter.domain = queryParams.domain;
      }
      if (queryParams.gender) {
        filter.gender = queryParams.gender;
      }
      if (queryParams.available !== undefined) {
        filter.available = queryParams.available;
      }

      // Implement sorting by specific fields (e.g., name, email)
      if (queryParams.sortBy) {
        sort[queryParams.sortBy] = queryParams.sortOrder === "desc" ? -1 : 1;
      }

      // Implement searching by name or any other field
      if (queryParams.search) {
        search = {
          $or: [
            { first_name: { $regex: queryParams.search, $options: "i" } },
            { last_name: { $regex: queryParams.search, $options: "i" } },
            { domain: { $regex: queryParams.search, $options: "i" } },
          ],
        };
      }

      const users = await User.find({ ...filter, ...search }).sort(sort);
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
      const newUserId = await helperFunctions.generateUserId();
      userData.id = newUserId;
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
