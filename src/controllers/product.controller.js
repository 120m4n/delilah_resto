const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const connection = require("../db/connection");
const { sign } = require("jsonwebtoken");

//configurtacion asincrona de las llamadas
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

module.exports = {
  //   getAll, getByID, create, update, delete
  asyncGetAll: async (req, res) => {
    try {
      let sql =
        "SELECT id_product, product_name, price FROM product where availability=1";
      const rows = await query(sql);
      res.json(rows);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  },
  asyncGetByID: async (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT * FROM product 
                WHERE id_product = ${connection.escape(id)} 
                and availability=1;`;
      const rows = await query(sql);
      res.json(rows);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  },
  asynCreate: async (req, res) => {
    try {
      const body = req.body;
      let sql = "INSERT INTO product (product_name, price) VALUES (?,?)";
      const rows = await query(sql, [body.product_name, body.price]);

      res.json(rows);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  },
  asyncUpdate: async (req, res) => {
    try {
      const body = req.body;
      const { id } = req.params;
      let sql =
        "UPDATE product SET product_name = ?, price = ?, availability = ? WHERE id_product = ?";
      const rows = await query(sql, [
        body.product_name,
        body.price,
        body.availability,
        id,
      ]);

      res.json(rows);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  },
    asyncDelete: async (req, res) => {
     try {
       const { id } = req.params;
       let sql = "DELETE FROM product WHERE id_product = ?";
       const rows = await query(sql, [
         id,
       ]);

       res.json(rows);
     } catch (err) {
       console.log(err);
       return res.status(500).json({
         success: 0,
         message: err.message,
       });
     }       
    }
};