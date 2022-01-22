const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const json = require("jsonwebtoken");
exports.registerController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { name, userName, email, password } = req.body;
    const registredUser = await userModel.findOne({ email }).exec();
    if (registredUser) {
      return res.json({
        status: 400,
        message: "Email is invalid or already taken",
      });
    }
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const user = new userModel({
      name,
      userName,
      email,
      password: hashPassword,
    });

    user.save(async (err, userData) => {
      if (err) {
        return res.json({ status: 400, message: err });
      }
      if (userData) {
        const token = await json.sign(
          { id: userData._id },
          process.env.TOKEN_CODE,
          {
            expiresIn: "5h",
          }
        );

        res.json({
          status: 200,
          user: {
            token,
            userName: "",
            name: userData.name,
            email: userData.email,
            id: userData._id,
          },
          msg: `Thank you! Thanks for signing up. Welcome to our community. We are happy to have you on board.`,
        });
      }
    });
  } catch (error) {
    return res.json({ status: 400, message: error });
  }
};

exports.loginController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const registredUser = await userModel.findOne({ email }).exec();

    if (!registredUser) {
      return res.json({
        status: 400,
        message: "Please first register",
      });
    }
    const checkPassword = bcrypt.compareSync(password, registredUser.password);
    if (!checkPassword) {
      return res.json({
        status: 400,
        message: "Your Login Information is Incorrect.",
      });
    }

    const token = await json.sign(
      { id: registredUser._id },
      process.env.TOKEN_CODE,
      {
        expiresIn: "5h",
      }
    );

    res.json({
      status: 200,
      user: {
        token,
        userName: registredUser.name,
        name: registredUser.name,
        email: registredUser.email,
        id: registredUser._id,
      },
      msg: `heeey,Welcome Back ${registredUser.name}!.`,
    });
  } catch (error) {
    return res.json({ status: 400, message: error });
  }
};
