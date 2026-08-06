const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine type is required"],
      enum: {
        values: ["Italian", "Indian", "Chinese", "Mexican", "Japanese"],
        message: "{VALUE} is not a valid cuisine",
      },
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "At least one ingredient is required",
      },
    },
    cookingSteps: {
      type: [String],
      required: [true, "Cooking steps are required"],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "At least one cooking step is required",
      },
    },
    preparationTime: {
      type: Number,
      required: [true, "Preparation time is required"],
      min: [0, "Preparation time cannot be negative"],
      comment: "Time in minutes",
    },
    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
      min: [0, "Cooking time cannot be negative"],
      comment: "Time in minutes",
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty level is required"],
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "{VALUE} is not a valid difficulty level",
      },
    },
    vegetarian: {
      type: Boolean,
      required: [true, "Vegetarian status is required"],
      default: false,
    },
    calories: {
      type: Number,
      required: [true, "Calories are required"],
      min: [0, "Calories cannot be negative"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    averageRating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

recipeSchema.virtual("totalTime").get(function () {
  return this.preparationTime + this.cookingTime;
});

module.exports = mongoose.model("Recipe", recipeSchema);
