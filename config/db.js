const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");

    const uri = process.env.MONGODB_URI;

    console.log("Checking URI:", uri ? "Found" : "Not found");

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    console.log("Connection string found, connecting...");

    await mongoose.connect(uri);

    console.log("MongoDB Connected Successfully!");
    console.log("Database: " + mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error("   " + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
