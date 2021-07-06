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
  .post("/login", validationMiddleware.login, UserController.asyncLogin)
  .post("/registration", validationMiddleware.registration, UserController.asyncCreateUser)
  .get("/", AuthorizationAdmin, UserController.asyncGetAllUsers) 
  .get("/:id_user", AuthorizationUser,ConfidentialInfo, UserController.asyncGetUserByID); 
  

module.exports = router;
