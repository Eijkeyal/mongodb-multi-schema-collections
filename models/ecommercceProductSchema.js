const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Each product must have its own name"],
      trim: true,
      min: [10, "Product name must be at least 10 chatacters"],
      max: [50, "Product name must not exceed than 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Each product must have description"],
      trim: true,
      min: [20, "Product description must be atleast 20 characters"],
      max: [100, "Product description must not exceed than 50 characters"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "Price Cannot be less than 0"],
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: [0, "Discount percentage cannot be less than 0%"],
      max: [100, "Discount percentage cannot be more than 100%"],
    },
    quantityInStock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
    },
    catgory: {
      type: String,
      required: [true, "Category must be defined"],
      enum: {
        values: ["Electronics", "Clothing", "Shoes", "Books", "Grocery"],
        message: "{VALUE} is not valid in catgory",
      },
    },
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
      validate: {
        validator: function (images) {
          return images.length > 0;
        },
        message: "At least one product image is required",
      },
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamp: true,
  },
);
module.exports = mongoose.model("product", productSchema);
