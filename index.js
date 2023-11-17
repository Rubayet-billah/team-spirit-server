const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

async function run() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.DB_URL);
    console.log("🔋database connected successfully");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

run();
