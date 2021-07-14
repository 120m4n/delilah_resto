const validator = require("../helpers/validate");

const registration = (req, res, next) => {
  const validationRule = {
    email: "required|email",
    name: "required|string",
    last_name: "required|string",
    address: "required|string",
    phone: "required|numeric|min:10",
    username: "required|string|min:5|max:15",
    password: "required|string|min:6",
  };
validator(req.body, validationRule, {}, (err, status) => {
  if (!status) {
    res.status(412).send({
      success: false,
      message: "Validation failed",
      data: err,
    });
  } else {
    next();
  }
  });
};

const login = (req, res, next) => {
  const validationRule = {
    email: "required_without:username",
    username: "required_without:email",
    password: "required",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};


const order = (req, res, next) => {
  const validationRule = {
    id_user: "required|numeric",
    id_payment: "required|numeric|min:1|max:3",
    products: "required",
    "products.*.id_product": "required|numeric",
    "products.*.quantity": "required|numeric",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const product = (req, res, next) => {
  const validationRule = {
    product_name: "required|string",
    price: "required|numeric|max:1000000",
    availability: "boolean",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const status = (req, res, next) => {
  const validationRule = {
    id_state: "required|numeric|min:1|max:6",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  registration,
  login,
  product,
  status,
  order,
};
