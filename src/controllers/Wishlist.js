const modelWishlist = require("../models/Wishlist");
const multer = require("../middleware/multer");

module.exports = {
  getAll: (req, res) => {
    const queryParams = {
      field: req.query.field,
      search: req.query.search
    };
    modelWishlist
      .getAll(queryParams)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },

  insertWishlist: (req, res) => {
    const data = {
      id_product: req.body.id_product,
      id_user: 1
    };
    modelWishlist
      .insertWishlist(data)
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
    const id_product = {
      id_product: req.params.id
    };
    modelWishlist
      .deleteWishlist(id_product)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  }
};
