require("dotenv").config();

// Importacion de variables de entorno
const API_PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

const compression = require("compression");
const express = require("express");
const app = express();

const helmet = require("helmet");
const cors = require("cors");
const expressJWT = require("express-jwt");


app.use(express.json(), compression(), helmet(), cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(expressJWT({ secret: JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ["/login", "/users/register"] }));

const UserRouter = require("./routers/user.router");
app.use("/user", UserRouter);

/* ---------------------------------- GESTION DE ERRORES --------------------------------- */
//Endpoint not found error
app.use((req, res) => {
  res.status(404).send({
    status: "Error",
    message: "Endpoint not found",
  });
});

// Generic Error (MUST BE LAST)
app.use((err, req, res, next) => {
  if (err) res.status(err.status).send({ status: "Error", message: err });
  // next();
});

/* ------------------------------- CONNECTION ------------------------------- */
app.listen(API_PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT:", API_PORT);
});
