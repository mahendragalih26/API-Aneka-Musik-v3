require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  authLogin: (req, res, next) => {
    try {
      const header = req.headers["authorization"];
      const bearer = header.split(" ");
      const token = bearer[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, AuthData) => {
        if (err) {
          res.json(403, { msg: "Invalid Token!" });
        } else {
          req.id = AuthData.user.id;
          req.name = AuthData.user.name;
          req.email = AuthData.user.email;
          req.level = AuthData.user.level;
          next();
        }
      });
    } catch (err) {
      console.log(err);
      res.json(403, { msg: "login first" });
    }
  },
  verifyAdmin: (req, res, next) => {
    if (req.level === "admin") {
      next();
    } else {
      res.sendStatus(403);
    }
  },
  addBook: (req, res, next) => {
    if (req.level === "admin") {
      req.id_status = 1;
      req.addBy = "Admin";
      next();
    } else {
      req.id_status = 3;
      req.addBy = req.name;
      next();
    }
  }
};
