const modelCart = require("../models/Cart");
const multer = require("../middleware/multer");

module.exports = {
  getAll: (req, res) => {
    const queryParams = {
      field: req.query.field,
      search: req.query.search
    };
    modelCart
      .getAll(queryParams)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },

  insertCart: (req, res) => {
    const data = {
      id_product: req.body.id_product,
      id_user: req.body.id_user,
      qty: 1
    };
    modelCart
      .insertCart(data)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },

  //   updateWishlist: (req, res) => {
  //     const data = {
  //       id_product: req.body.id_product,
  //       id_user: req.body.id_user
  //     };

  //     const id = {
  //       id: req.params.id
  //     };

  //     modelProduct
  //       .updateWishlist(data, id)
  //       .then(result => res.json(result))
  //       .catch(err => console.log(err));
  //   },

  deleteWishlist: (req, res) => {
    const id = {
      id: req.params.id
    };
    modelWishlist
      .deleteWishlist(id)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  }
};
