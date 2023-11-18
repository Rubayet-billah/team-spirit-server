const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  // Define user schema fields
  name: String,
  email: String,
  // Add other fields as needed
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
