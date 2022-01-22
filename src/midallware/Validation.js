const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "register": {
      return [
        body("name", "Please enter name").exists(),
        body("password", "Please enter password").exists(),
        body("userName", "Please enter userName").exists(),
        body("email", "Please enter a valid email address").exists().isEmail(),
      ];
    }
    case "login": {
      return [
        body("password", "Please enter password").exists(),
        body("email", "Please enter a valid email address").exists().isEmail(),
      ];
    }
    case "blog": {
      return [
        body("title", "Please enter title").exists(),
        body("description", "Please enter title").exists(),
        body("content", "Please enter title").exists(),
        body("auther", "Please enter title").exists(),
      ];
    }
  }
};
