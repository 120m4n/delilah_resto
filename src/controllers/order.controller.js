const connection = require("../db/connection");

const OrderService = require("../services/order.service");

//configurtacion asincrona de las llamadas
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

module.exports = {
  //   getAll, getByID, create, update, delete
  asyncGetAll: async (req, res) => {
    try {
      let sql =
        `SELECT o.id_order, o.time, st.order_state , pay.method , u.username, u.address 
          FROM orders o 
          JOIN order_state st ON o.id_state = st.id_state 
          JOIN payment pay ON o.id_payment = pay.id_payment 
          JOIN user u ON o.id_user = u.id_user ORDER BY o.time desc;`;
      const rows = await query(sql);
      res.json(rows);
    } catch (err) {
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
  asyncCreate: async (req, res) => {
    try {
      const body = req.body;
      const neworder = await OrderService.createOrder(body);
      const id_order = neworder.insertId;
      const items = req.body.items;
      const pArray = items.map(async (item) => {
        const { id_product, quantity } = item;
        const price = await OrderService.getPrice(id_product);
        const rows = await OrderService.addDetail(
          id_order,
          id_product,
          quantity,
          price
        );
        // await console.log(Object.keys(rows));
        return rows;
      });

      const results = await Promise.all(pArray);

      return res.status(200).json({
        success: 1,
        order: id_order,
        data: results,
      });
    } catch (err) {
      // console.log(err);
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  },
  asyncUpdate: async (req, res) => {
    try {
      const id_state = req.body.id_state;
      const { id } = req.params;
      const rows = await OrderService.updateStatus( id_state, id);

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
      const rows = await query(sql, [id]);

      res.json(rows);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  },
};
