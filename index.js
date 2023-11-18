const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const router = require("./src/app/routes");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

async function run() {
  try {
    // Connect to MongoDB using Mongoose
    await connect(process.env.DB_URL);
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
