const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const {
  AuthorizationAdmin,
  AuthorizationUser,
  ConfidentialInfo,
} = require("../auth/authorization");

const validationMiddleware = require("../middleware/validation-middleware");


router
  .post("/registration", validationMiddleware.registration, UserController.asyncCreateUser)
  .get("/", AuthorizationAdmin, UserController.asyncGetAllUsers) //add middleware validation admin/user
  .get("/:id", AuthorizationUser,ConfidentialInfo, UserController.asyncGetUserByID) //add middleware validation admin/user
  .post("/login",validationMiddleware.login, UserController.asyncLogin);

module.exports = router;
