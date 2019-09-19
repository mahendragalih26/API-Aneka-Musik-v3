require("dotenv").config();

// import package
const modelUsers = require("../models/auth");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

(encrypt = key => {
  const password = crypto
    .createHash("SHA1")
    .update(key)
    .digest("hex");
  return password;
}),
  (module.exports = {
    register: (req, res) => {
      const hashPassword = encrypt(req.body.password);
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        level: "user"
      };

      // if (!validateForm(data)) {
      //   return res.json(404, { status: 404, errMsg: 'data not valid' })
      // }

      modelUsers
        .getEmail(data.email)
        .then(result => {
          if (result.length === 0) {
            return modelUsers.register(data);
          } else {
            const msg = {
              status: 409,
              errMsg: "Email is already in use."
            };
            res.json(409, msg);
          }
        })
        .then(result => res.json(result))
        .catch(err => console.log(err));
    },
    login: (req, res) => {
      const hashPassword = encrypt(req.body.password);
      const data = {
        email: req.body.email,
        password: hashPassword
      };

      modelUsers
        .login(data)
        .then(result => {
          const getPassword = result[0].password; // get password from db
          const user = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            level: result[0].level
          };

          if (data.password == getPassword) {
            jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
              if (!err) {
                const data = {
                  ...user,
                  token: `Bearer ${token}`
                };
                res.json({ data });
                // res.header('auth-token', token).send(token);
              } else {
                console.log(err);
              }
            });
          } else {
            const errMessage = {
              status: 404,
              errMsg: "Your Email or Password Incorrect."
            };
            res.json(404, errMessage);
          }
        })
        .catch(err => res.json(404, err));
    }
  });
