const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

router
  .post("/", UserController.asyncCreateUser)
  .get("/", UserController.asyncGetAllUsers) //add middleware validation admin/user
  .get("/:id", UserController.asyncGetUserByID) //add middleware validation admin/user
  .post("/login", UserController.asyncLogin);

module.exports = router;
