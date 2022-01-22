const jwt = require("jsonwebtoken");
const userMdoel = require("../models/user");

exports.checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userInfo = await jwt.verify(token, process.env.TOKEN_CODE);

    const user = await userMdoel.findById(userInfo.id);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Authorization required", status: 500, success: false });
  }
};
