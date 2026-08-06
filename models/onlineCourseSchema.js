const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor reference is required"],
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
      default: 0,
    },
    level: {
      type: String,
      required: [true, "Course level is required"],
      enum: {
        values: ["Beginner", "Intermediate", "Advanced"],
        message: "{VALUE} is not a valid course level",
      },
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
    },
    lessons: {
      type: [
        {
          title: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            trim: true,
          },
          duration: {
            type: Number,
            required: true,
            min: [0, "Lesson duration cannot be negative"],
            comment: "Duration in minutes",
          },
          videoUrl: {
            type: String,
            required: true,
          },
          order: {
            type: Number,
            required: true,
            min: [0, "Order cannot be negative"],
          },
        },
      ],
      required: [true, "At least one lesson is required"],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "Course must have at least one lesson",
      },
    },
    studentsEnrolled: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    duration: {
      type: Number,
      required: [true, "Course duration is required"],
      min: [0, "Duration cannot be negative"],
      comment: "Duration in hours",
    },
    certificateAvailable: {
      type: Boolean,
      required: [true, "Certificate availability is required"],
      default: false,
    },
    language: {
      type: String,
      required: [true, "Course language is required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      required: [true, "Published status is required"],
      default: false,
    },
    publishedDate: {
      type: Date,
      validate: {
        validator: function (val) {
          if (this.published === true && !val) {
            return false;
          }
          return true;
        },
        message: "Published date is required when course is published",
      },
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.pre("save", function (next) {
  if (this.published && !this.publishedDate) {
    this.publishedDate = new Date();
  }
  next();
});

module.exports = mongoose.model("Course", courseSchema);
