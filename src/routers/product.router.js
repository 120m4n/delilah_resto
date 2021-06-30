const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const {
  AuthorizationAdmin,
  AuthorizationUser,
} = require("../auth/authorization");

const validationMiddleware = require("../middleware/validation-middleware");

router
  .get("/", ProductController.asyncGetAll)
  .get("/:id", ProductController.asyncGetByID)
  .post("/", validationMiddleware.product, AuthorizationAdmin, ProductController.asyncCreate) // add AuthorizationAdmin
  .put("/:id", validationMiddleware.product, AuthorizationAdmin, ProductController.asyncUpdate) // add AuthorizationAdmin
  .delete("/:id", AuthorizationAdmin, ProductController.asyncDelete); // add AuthorizationAdmin

module.exports = router;
