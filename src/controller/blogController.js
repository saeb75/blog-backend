const { validationResult } = require("express-validator");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const blogModel = require("../models/blog");

exports.addBlog = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { title, description, content, auther, mainImage } = req.body;
    const blog = new blogModel({
      title,
      description,
      content,
      auther,
      mainImage,
    });
    blog.save(async (err, data) => {
      if (err) {
        return resetWatchers.json({});
      }
      if (data) {
        return res.json({
          success: true,
          status: 200,
          blog: await data.populate("auther", "name"),
        });
      }
    });
  } catch (error) {}
};
exports.deleteBlog = (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    console.log(req.params);
    blogModel.findByIdAndDelete({ _id: id }).exec((err, data) => {
      if (err) {
        return res.json({
          success: false,
          message: "Somthing went wrong",
        });
      }
      return res.json({
        success: true,
        message: "Blog deleted Successfully",
      });
    });
  } catch (error) {}
};
exports.getAllBlog = async (req, res) => {
  console.log(req.user);
  try {
    const blogs = await blogModel.find().exec();
    if (blogs) {
      return res.json({
        status: 200,
        blogs,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Somthing went wrong",
      error,
    });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBlog = await blogModel
      .findOneAndUpdate({ _id: id }, { ...req.body })
      .exec();
    res.json({ success: true, message: "Updated is succussfuly" });
  } catch (error) {
    return res.json({
      success: false,
      message: "Somthing went wrong",
      error,
    });
  }
};
