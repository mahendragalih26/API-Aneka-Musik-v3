const modelProduct = require("../models/Product");
const multer = require("../middleware/multer");
const cloudinary = require("../config/cloudinaryConfig");

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
    const imageData = {
      img: req.file
    };

    if (imageData.img) {
      const file = multer.dataUri(req).content;
      cloudinary.uploader
        .upload(file)
        .then(result => {
          const data = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            id_branch: req.body.id_branch,
            id_category: req.body.id_category,
            img: result.url
          };
          modelProduct
            .insertProduct(data)
            .then(msg => res.json(msg))
            .catch(err => {
              console.log(err);
              if (err.errno == 1048)
                res.json(400, {
                  msg: "There are fields that have not been filled."
                });
            });
        })
        .catch(err =>
          res.status(400).json({
            message: "someting went wrong while processing your request",
            data: {
              err
            }
          })
        );
    }
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
