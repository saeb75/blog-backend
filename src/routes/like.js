const express = require("express");
const { likeHandler } = require("../controller/likeController");
const { checkToken } = require("../midallware/AuthMiddelware");

const router = express.Router();
router.put("/blog/like/:id", checkToken, likeHandler);

module.exports = router;
