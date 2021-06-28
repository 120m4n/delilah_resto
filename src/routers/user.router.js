const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const {
  AuthorizationAdmin,
  AuthorizationUser,
} = require("../auth/authorization");

router
  .post("/registration", UserController.asyncCreateUser)
  .get("/", AuthorizationAdmin, UserController.asyncGetAllUsers) //add middleware validation admin/user
  .get("/:id", AuthorizationUser, UserController.asyncGetUserByID) //add middleware validation admin/user
  .post("/login", UserController.asyncLogin);

module.exports = router;
