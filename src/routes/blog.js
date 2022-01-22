const express = require("express");

const {
  addBlog,
  deleteBlog,
  getAllBlog,
  updateBlog,
} = require("../controller/blogController");
const { checkToken } = require("../midallware/AuthMiddelware");
const { validate } = require("../midallware/Validation");
const router = express.Router();
router.get("/blog/get", getAllBlog);
router.post("/blog/add", validate("blog"), addBlog);
router.put("/blog/update/:id", validate("blog"), updateBlog);
router.delete("/blog/delete/:id", deleteBlog);

module.exports = router;
