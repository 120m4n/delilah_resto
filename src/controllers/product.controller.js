const ProductService = require("../services/product.service");


  //   getAll, getByID, create, update, delete
const asyncGetAll = async (req, res) => {
  try {
    let rows = await ProductService.getAllProducts();
    return res.status(200).json({
      success: 1,
      data: rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: err.message,
    });
  }
};
const asyncGetByID = async (req, res) => {
    try {
      const { id } = req.params;
      let rows = await ProductService.getProductById(id);
      return res.status(200).json({
        success: 1,
        data: rows,
      });
    } catch (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
    }
  };
const asyncCreate = async (req, res) => {
    try {
      const { product_name, price } = req.body;
      const rows = await ProductService.createProduct(product_name, price);
      return res.status(200).json({
        success: 1,
        data: rows,
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  };
const asyncUpdate = async (req, res) => {
    try {
      const { product_name, price, availability } = req.body;
      const { id } = req.params;

      let rows = await ProductService.updateProduct(
        product_name,
        price,
        availability,
        id
      );
      return res.status(200).json({
        success: 1,
        data: rows,
      });

    } catch (err) {
        return res.status(500).json({
          success: 0,
          message: err.message,
        });
    }
  };
const asyncDelete = async (req, res) => {
    try {
      const { id } = req.params;
      //check integrity of table favorities
      let infavorites = await ProductService.getFavoriteProductById(id);
      let orderdetails = await ProductService.getOrderDetailsProductById(id);

      if (infavorites.length > 0 || orderdetails.length > 0) {
        // soft delete
        let rows = await ProductService.softDeleteProduct(id);
        res.status(403).json({
          message: "SoftDelete Product in favorities Table or in order details table",
          result: rows,
        });
      } else {
        let rows = await ProductService.deleteProduct(id);
        return res.status(200).json({
          success: 1,
          data: rows,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  };
module.exports = {
  asyncGetAll,
  asyncGetByID,
  asyncCreate,
  asyncUpdate,
  asyncDelete,

};