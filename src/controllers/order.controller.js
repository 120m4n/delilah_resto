const OrderService = require("../services/order.service");

const asyncGetAll = async (req, res) => {
  try {
    const rows = await OrderService.getAllOrder();
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
};

const asyncUpdate = async (req, res) => {
  try {
    const id_state = req.body.id_state;
    const { id } = req.params;
    const rows = await OrderService.updateStatus(id_state, id);

    return res.status(200).json({
      success: 1,
      data: rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      message: err.message,
    });
  }
};

const asyncDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let rows = await OrderService.getOrderById(id);
    if (rows.length > 0) {
      let order_detail = await OrderService.deleteOrderDetail(id);
      let order = await OrderService.deleteOrder(id);

      return res.status(200).json({
        success: 1,
        order: id,
        data: order,
      });
    } else {
      return res.status(404).json({
        success: 0,
        message: "Order Not Found",
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
  asyncCreate,
  asyncUpdate,
  asyncDelete,
};
