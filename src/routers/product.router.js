const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const {
  AuthorizationAdmin,
  AuthorizationUser,
} = require("../auth/authorization");

router
  .get("/", ProductController.asyncGetAll)
  .get("/:id", ProductController.asyncGetByID)
  .post("/", AuthorizationAdmin, ProductController.asyncCreate) // add AuthorizationAdmin
  .put("/:id", AuthorizationAdmin, ProductController.asyncUpdate) // add AuthorizationAdmin
  .delete("/:id", AuthorizationAdmin, ProductController.asyncDelete); // add AuthorizationAdmin

module.exports = router;
