const res = require("express/lib/response");
const blogModel = require("../models/blog");

exports.likeHandler = async () => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findOne(id);

    return res.json({ success: true, blog });
  } catch (error) {
    return res.json({
      success: false,
      message: "Somthing went wrong",
      error,
    });
  }
};
