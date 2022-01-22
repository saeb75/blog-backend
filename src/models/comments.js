const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  auther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  ],
  vies: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }],
});

module.exports = mongoose.model("Comment", blogSchema);
