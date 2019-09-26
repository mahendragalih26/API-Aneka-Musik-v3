const conn = require("../config/db");

module.exports = {
  getAll: queryParams => {
    //Search
    return new Promise((resolve, reject) => {
      const searching = queryParams.search || "";
      const field = queryParams.field || "name";
      const searchDefined = queryParams.search != undefined;
      const fieldDefined = queryParams.field != undefined;

      //Do query
      let query = `SELECT tbl_transaction.id, tbl_transaction.date, tbl_transaction.id_product, tbl_transaction.id_user, tbl_transaction.total, tbl_transaction.qty, tbl_product.name, tbl_product.price, tbl_product.stock FROM tbl_transaction, tbl_product WHERE tbl_transaction.id_product = tbl_product.id `;
      if (searchDefined || fieldDefined) {
        query += `AND ${field} = ${searching} `;
        //   if (field2 != null) {
        //     query += `AND outlet.${field1} LIKE '%${searching}% AND outlet.${$field2} LIKE '%${searching}%'`;
        //   }
        //   query += `AND tbl_product.${field} LIKE '%${searching}%' `;
      }
      conn.query(query, (err, result) => {
        if (!err) {
          if (result.length > 0) {
            const response = {
              values: result
            };
            resolve(response);
          } else {
            const msg = {
              status: 404,
              msg: "Data not found"
            };
            console.log(err);
            resolve(msg);
          }
        } else {
          reject(err);
        }
      });
    });
  },

  insertCheckout: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT tbl_transaction SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  }

  // updateWishlist: (data, id) => {
  //   return new Promise((resolve, reject) => {
  //     conn.query(
  //       "UPDATE tbl_wishlist SET ? WHERE ?",
  //       [data, id],
  //       (err, result) => {
  //         if (!err) {
  //           resolve(result);
  //         } else {
  //           reject(err);
  //         }
  //       }
  //     );
  //   });
  // },

  // deleteCart: id => {
  //   return new Promise((resolve, reject) => {
  //     conn.query("DELETE FROM tbl_Cart WHERE ?", [id], (err, result) => {
  //       if (!err) {
  //         resolve(result);
  //       } else {
  //         reject(err);
  //       }
  //     });
  //   });
  // }
};
