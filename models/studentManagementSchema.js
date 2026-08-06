const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [5, "Name must be at least 5 characters"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [16, "Age must be at least 16 years"],
      max: [60, "Age cannot exceed 60 years"],
      validate: {
        validator: Number.isInteger,
        message: "Age must be an integer",
      },
    },

    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: [
          "Computer Science",
          "Business",
          "Civil Engineering",
          "Electrical Engineering",
        ],
        message: "{VALUE} is not a valid department",
      },
    },

    currentSemester: {
      type: Number,
      required: [true, "Current semester is required"],
      enum: {
        values: [1, 2, 3, 4, 5, 6, 7, 8],
        message: "{VALUE} is not a valid semester",
      },
    },

    gpa: {
      type: Number,
      min: [0, "GPA cannot be less than 0"],
      max: [4, "GPA cannot be greater than 4"],
      default: 0,
    },

    isEnrolled: {
      type: Boolean,
      default: true,
    },

    subjects: [
      {
        type: String,
        enum: [
          "English",
          "Nepali",
          "Math",
          "Computer Science",
          "Account",
          "Social",
          "Economics",
          "Optional Math",
          "Science",
        ],
      },
    ],

    admissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

module.exports = mongoose.model("Student", studentSchema);
