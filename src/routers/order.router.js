const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/order.controller");
const {
  AuthorizationAdmin,
  AuthorizationUser,
  CurrentUser,
} = require("../auth/authorization");

const validationMiddleware = require("../middleware/validation-middleware");

router
  .get("/", AuthorizationAdmin, OrderController.asyncGetAll)
  .post(
    "/",
    validationMiddleware.order,
    AuthorizationUser,
    CurrentUser,
    OrderController.asyncCreate
  )
  .put("/:id/", AuthorizationAdmin, OrderController.asyncUpdate) //condicion 4
  .delete("/:id", AuthorizationAdmin, OrderController.asyncDelete);

module.exports = router;
