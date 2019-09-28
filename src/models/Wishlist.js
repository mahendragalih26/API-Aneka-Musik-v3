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
      let query = `SELECT tbl_wishlist.id, tbl_wishlist.id_product, tbl_wishlist.id_user, tbl_product.name as name, tbl_product.img FROM tbl_wishlist, tbl_product WHERE tbl_product.id = tbl_wishlist.id_product `;
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

  insertWishlist: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT tbl_wishlist SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

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

  deleteWishlist: id_product => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE FROM tbl_wishlist WHERE ?",
        [id_product],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  }
};
