const helperFunctions = require("../../../helpers/helperFunctions");
const User = require("./user.model");

const UserService = {
  async getAllUsers(queryParams) {
    try {
      const filter = helperFunctions.applyFilter(queryParams);
      const search = helperFunctions.applySearch(queryParams);
      const sort = helperFunctions.applySort(queryParams);
      const pagination = helperFunctions.applyPagination(queryParams);

      const users = await User.find({ ...filter, ...search })
        .sort(sort)
        .skip(pagination.skip)
        .limit(pagination.limit);

      const dataCount = await User.find({ ...filter, ...search })
        .sort(sort)
        .countDocuments();

      return { count: dataCount, users };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getUserById(userId) {
    try {
      const user = await User.findOne({ id: userId });
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
      const updatedUser = await User.findOneAndUpdate(
        { id: userId },
        updatedUserData,
        {
          new: true,
        }
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
