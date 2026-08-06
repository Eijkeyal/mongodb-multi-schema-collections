const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: {
        values: ["Full-time", "Part-time", "Internship", "Contract"],
        message: "{VALUE} is not a valid job type",
      },
    },
    skillsRequired: {
      type: [String],
      required: [true, "Skills required is required"],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "At least one skill is required",
      },
    },
    experienceRequired: {
      type: Number,
      required: [true, "Experience required is required"],
      min: [0, "Experience cannot be less than 0"],
      max: [20, "Experience cannot exceed 20 years"],
    },
    remoteOrOnsite: {
      type: String,
      required: [true, "Work mode is required"],
      enum: {
        values: ["Remote", "Onsite", "Hybrid"],
        message: "{VALUE} is not a valid work mode",
      },
    },
    numberOfOpenings: {
      type: Number,
      required: [true, "Number of openings is required"],
      min: [1, "At least 1 opening is required"],
    },
    applicationDeadline: {
      type: Date,
      required: [true, "Application deadline is required"],
      validate: {
        validator: function (val) {
          return val > new Date();
        },
        message: "Application deadline must be in the future",
      },
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: [true, "Recruiter reference is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["Open", "Closed", "Filled"],
        message: "{VALUE} is not a valid status",
      },
      default: "Open",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
