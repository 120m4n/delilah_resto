const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/order.controller");
const {
  AuthorizationAdmin,
  AuthorizationUser,
} = require("../auth/authorization");

router
  .get("/", AuthorizationAdmin, OrderController.asyncGetAll)
  .post("/", AuthorizationUser, OrderController.asyncCreate)
  .put("/:id/", AuthorizationAdmin, OrderController.asyncUpdate) //condicion 4
  .delete("/:id", AuthorizationAdmin, OrderController.asyncDelete);

module.exports = router;
