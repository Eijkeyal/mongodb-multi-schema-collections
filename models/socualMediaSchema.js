const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, "Caption is required"],
      trim: true,
      maxlength: [1000, "Caption cannot exceed 1000 characters"],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (val) {
          if (this.videos && this.videos.length > 0 && val && val.length > 0) {
            return false;
          }
          return true;
        },
        message: "Post cannot have both images and videos",
      },
    },
    videos: {
      type: [String],
      default: [],
      validate: {
        validator: function (val) {
          if (this.images && this.images.length > 0 && val && val.length > 0) {
            return false;
          }
          return true;
        },
        message: "Post cannot have both images and videos",
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author reference is required"],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          text: {
            type: String,
            required: true,
            trim: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    visibility: {
      type: String,
      required: [true, "Visibility setting is required"],
      enum: {
        values: ["Public", "Friends", "Private"],
        message: "{VALUE} is not a valid visibility setting",
      },
      default: "Public",
    },
    location: {
      type: String,
      trim: true,
    },
    hashtags: {
      type: [String],
      default: [],
      set: function (tags) {
        return tags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
      },
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
      validate: {
        validator: function (val) {
          if (this.isEdited === true && !val) {
            return false;
          }
          return true;
        },
        message: "Edited at is required when post is edited",
      },
    },
  },
  {
    timestamps: true,
  },
);

postSchema.pre("save", function (next) {
  if (this.isEdited) {
    this.editedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
