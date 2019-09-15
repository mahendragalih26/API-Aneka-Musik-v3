const modelProduct = require("../models/Product");
const multer = require("../middleware/multer");

module.exports = {
  getAll: (req, res) => {
    const queryParams = {
      sort: req.query.sort,
      type: req.query.type,
      field: req.query.field,
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit
    };
    modelProduct
      .getAll(queryParams)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },

  insertProduct: (req, res) => {
    const data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      id_branch: req.body.id_branch,
      id_category: req.body.id_category,
      img: req.body.MyImage
    };
    modelProduct
      .insertProduct(data)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },

  updateProduct: (req, res) => {
    const data = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      id_branch: req.body.id_branch,
      id_category: req.body.id_category,
      img: req.body.MyImage
    };

    const id = {
      id: req.params.id
    };

    modelProduct
      .updateProduct(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  },

  deleteProduct: (req, res) => {
    const id = {
      id: req.params.id
    };
    modelProduct
      .deleteProduct(id)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  }
};
