const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
    auther: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],
    views: [
      { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
