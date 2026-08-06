const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Server starting...");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Found" : "Not found");

const connectDB = require("./config/db");

const Student = require("./models/studentManagementSchema");
const Patient = require("./models/hospitalPatientSchema");
const Job = require("./models/jobPortalSchema");
const Recipe = require("./models/recipeAppSchema");
const Post = require("./models/socualMediaSchema");
const Course = require("./models/onlineCourseSchema");
const Product = require("./models/ecommercceProductSchema");

const createAllCollections = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("Connecting with URI:", uri ? "Found" : "Not found");

    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
    console.log("Database: " + mongoose.connection.db.databaseName);

    console.log("\nCreating collections...");

    await Student.createCollection();
    console.log("students collection created");

    await Patient.createCollection();
    console.log("hospitalpatients collection created");

    await Job.createCollection();
    console.log("jobs collection created");

    await Recipe.createCollection();
    console.log("recipes collection created");

    await Post.createCollection();
    console.log("posts collection created");

    await Course.createCollection();
    console.log("courses collection created");

    await Product.createCollection();
    console.log("products collection created");

    console.log("\nAll 7 collections created successfully!");
    console.log("Database: " + mongoose.connection.db.databaseName);

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("\nCollections in database:");
    collections.forEach((col) => {
      console.log("  - " + col.name);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

createAllCollections();
