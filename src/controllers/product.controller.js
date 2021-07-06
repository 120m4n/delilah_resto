const ProductService = require("../services/product.service");


  //   getAll, getByID, create, update, delete
const asyncGetAll = async (req, res) => {
  try {
    let rows = await ProductService.getAllProducts();
    return res.status(200).json({
      success: true,
      message: "All products",
      data: rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: err.message,
      data: {}
    });
  }
};
const asyncGetByID = async (req, res) => {
    try {
      const { id_product } = req.params;
      let rows = await ProductService.getProductById(id_product);
      return res.status(200).json({
        success: true,
        example: 'Product Info',
        data: rows,
      });
    } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
          data: {}
        });
    }
  };
const asyncCreate = async (req, res) => {
    try {
      const { product_name, price } = req.body;
      const rows = await ProductService.createProduct(product_name, price);
      return res.status(200).json({
        success: true,
        message: "Product Created",
        data: {
          id_product: rows.insertId,
          product_name: product_name,
          price: price,
          availability: 1
        },
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
        data: {}
      });
    }
  };
const asyncUpdate = async (req, res) => {
    try {
      const { product_name, price, availability } = req.body;
      const { id_product } = req.params;

      let rows = await ProductService.updateProduct(
        product_name,
        price,
        availability,
        id_product
      );
      return res.status(200).json({
        success: true,
        message: 'Product update',
        data: rows,
      });

    } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
          data: {}
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
          success: true,
          message: "SoftDelete Product in favorities Table or in order details table",
          data: rows,
        });
      } else {
        let rows = await ProductService.deleteProduct(id);
        return res.status(200).json({
          success: true,
          message: "Product deleted successfully",
          data: rows,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
        data: {}
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