const connection = require("../db/connection");

//configurtacion asincrona de las llamadas
const util = require("util");
const query = util.promisify(connection.query).bind(connection);


const createOrder = async (data) => {
    try {
      // console.log("createorder: "+ data);
      let sql = `insert into orders (id_user, id_payment, id_state) values (?,?,1)`;
      const rows = await query(sql, [data.id_user, data.id_payment]);
      return rows;
    } catch (err) {
      throw err;
    }
};

const getPrice = async (id_product) => {
    try {
      let sql = `SELECT price FROM product WHERE id_product = ?`;
      const rows = await query(sql, [id_product]);
        // await console.log(rows[0].price);
        return rows[0].price;
        
    } catch (err) {
      throw err;
    }
};

const addDetail = async (id_order, id_product, quantity, price) => {
    try {
        let sql = `INSERT INTO order_detail(id_order, id_product, quantity, subtotal) VALUES(?, ?, ?, ?)`;
        const rows = await query(sql, [id_order, id_product, quantity, quantity*price]);
        return rows;
    } catch (err) {
        throw err;
    }

};

const updateStatus = async ( id_state,id_order) => {
    try {
      let sql = `UPDATE orders SET id_state = ? WHERE id_order = ?`;
      const rows = await query(sql, [
        id_state,
        id_order,
      ]);
      return rows;
    } catch (err) {
      throw err;
    }
};

// const deleteOrder = async (id_state, id_order) => {
//   try {
//     let sql = `UPDATE orders SET id_state = ? WHERE id_order = ?`;
//     const rows = await query(sql, [id_state, id_order]);
//     return rows;
//   } catch (err) {
//     throw err;
//   }
// };

const getOrderById = async (id_order) => {
  try {
    let sql = `SELECT * FROM orders WHERE id_order = ?`;
    const rows = await query(sql, [id_order]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteOrderDetail = async (id_order) => {
  try {
    let sql = `DELETE FROM order_detail WHERE id_order = ?`;
    const rows = await query(sql, [id_order]);
    return rows;
  } catch (err) {
    throw err;
  }
};

const deleteOrder = async  (id_order) => {
  try {
    let sql = `DELETE FROM orders WHERE id_order = ?`;
    const rows = await query(sql, [id_order]);
    return rows;
  } catch (err) {
    throw err;
  }
};



module.exports = {
  createOrder,
  getPrice,
  addDetail,
  updateStatus,
  getOrderById,
  deleteOrderDetail,
  deleteOrder,
};