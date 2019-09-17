const conn = require("../config/db");

module.exports = {
  getEmail: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tbl_user WHERE email =?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tbl_user WHERE email =?', [data.email], (err, result) => {
        if (!err && result.length > 0) {
          console.log("ok")
          resolve(result)
        } else {
          err = {
            status: 404,
            errMsg: 'Your Email or Password Incorrect.'
          }
          reject(err)
        }
      })
    })
  },
  register: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tbl_user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
};
