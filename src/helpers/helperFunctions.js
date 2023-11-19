// helpers.js
const User = require("../app/modules/users/user.model");

// Helper function for generating new user id
const generateUserId = async () => {
  try {
    // Fetch the last user from the database based on the 'id' field
    const lastUser = await User.findOne({}, {}, { sort: { id: -1 } });

    if (lastUser && lastUser.id) {
      // Extract the last user's 'id' and increment it for the next ID
      const lastUserId = parseInt(lastUser.id, 10);
      const nextUserId = lastUserId + 1;

      // Return the generated user ID
      return nextUserId;
    } else {
      // If no user found, start with user ID 1
      return 1;
    }
  } catch (error) {
    throw new Error("Error generating user ID: " + error.message);
  }
};

// Helper function for filtering users
const applyFilter = (queryParams) => {
  const filter = {};

  if (queryParams.domain) {
    filter.domain = queryParams.domain;
  }
  if (queryParams.gender) {
    filter.gender = queryParams.gender;
  }
  if (queryParams.available !== undefined) {
    filter.available = queryParams.available;
  }
  return filter;
};

// Helper function for searching users
const applySearch = (queryParams) => {
  const search = {};

  if (queryParams.search) {
    search.$or = [
      { first_name: { $regex: queryParams.search, $options: "i" } },
      { last_name: { $regex: queryParams.search, $options: "i" } },
    ];
  }

  return search;
};

// Helper function for sorting users
const applySort = (queryParams) => {
  const sort = {};

  if (queryParams.sortBy) {
    sort[queryParams.sortBy] = queryParams.sortOrder === "desc" ? -1 : 1;
  }

  return sort;
};

// Helper function for pagination
const applyPagination = (queryParams) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 50;
  const skip = (page - 1) * limit;

  return { skip, limit, page };
};

const helperFunctions = {
  generateUserId,
  applyFilter,
  applySearch,
  applySort,
  applyPagination,
};

module.exports = helperFunctions;
