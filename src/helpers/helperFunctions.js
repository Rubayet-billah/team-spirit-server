// helpers.js
const User = require("../app/modules/users/user.model");

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

const helperFunctions = {
  generateUserId,
};

module.exports = helperFunctions;
