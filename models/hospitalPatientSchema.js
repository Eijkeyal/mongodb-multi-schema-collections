const mongoose = require("mongoose");

const hospitalPatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be necessary"],
      minlength: [5, "Name be at least 5 character "],
      maxlength: [50, "Name must not exceed more than 50 characters"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age must be necessary"],
      min: [0, "Age must not be less than 0"],
      validate: {
        validator: Number.isInteger,
        message: "Age must be in integer",
      },
    },
    gender: {
      type: String,
      required: [true, "Gender must be necessary"],
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender",
      },
      lowercase: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood Groups must be necessary"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not a valid Blood Type",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number must be required"],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits(0-9)"],
    },
    address: {
      type: String,
      required: [true, "Address must be necessary"],
      trim: true,
      minlength: 0,
      maxlength: 100,
    },
    patientName: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: [String],
      default: [],
      set: function (conditions) {
        return [...new Set(conditions.map((c) => c.trim()))];
      },
    },
    allergies: {
      type: [String],
      default: [],
    },
    emergenciesContact: {
      _id: false,
      name: {
        type: String,
        required: true,
        trim: true,
      },
      relationship: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      },
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    isAdmitted: {
      type: Boolean,
      default: false,
    },
    roomNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function (val) {
          if (this.isAdmitted) {
            return typeof val === "string" && val.trim().length > 0;
          }
          return true;
        },
        message: "Room number is required when patient is admitted",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("HospitalPatient", hospitalPatientSchema);
