const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const UserService = require("../services/user.service");

const asyncGetAllUsers = async (req, res) => {
  try {
    const rows = await UserService.getAllUser();
    return res.status(200).json({
      success: true,
      message:'All user info',
      data: rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      data: {}
    });
  }
};
const asyncGetUserByID = async (req, res) => {
  try {
    const { id_user } = req.params;
      const rows = await UserService.getUserById(id_user);
      if (rows.length > 0) {
          return res.status(200).json({
            success: true,
            message: "User Information",
            data: rows,
          });
      } else {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
          data: {}
        });

      }

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      data: {}
    });
  }
};
const asyncCreateUser = async (req, res) => {
  const body = req.body;
  try {
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const rows = await UserService.createUser(body);
    return res.status(200).json({
      success: true,
      message: 'Successful user creation',
      data: {
        id_user: rows.insertId,
        username: body.username,
        email: body.email,
        name: body.name,
        last_name: body.last_name,
        address: body.address,
        phone: body.phone,
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      data: {}
    });
  }
};
const asyncLogin = async (req, res) => {
  const body = req.body;

  if (body.email) {
    //get user by email
    const rows = await UserService.getUserByEmail(body.email);
    if (rows.length) {
      //cliente admin/user con el pass descifrado en bd
      let result = body.password === rows[0].password;

      if (!result) {
        result = compareSync(body.password, rows[0].password);
      }
      if (result) {
        rows[0].password = undefined;
        const token = sign({ credentials: rows[0] }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: token,
        });
      }
    }
    return res.status(401).json({
      success: false,
      message: "Login Invalid email or password",
      data: {},
    });
  } else {
    //get user by username
    const rows = await UserService.getUserByUserName(body.username);

    if (rows.length) {
      //cliente envia el pass descifrado
      let result = body.password === rows[0].password;

      if (!result) {
        result = compareSync(body.password, rows[0].password);
      }
      if (result) {
        rows[0].password = undefined;
        const token = sign({ credentials: rows[0] }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.status(200).json({
          success: true,
          message: "Login successful",
          data: token,
        });
      }
    }
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
      data: {},
    });
  }
};

module.exports = {
  asyncGetAllUsers,
  asyncGetUserByID,
  asyncCreateUser,
  asyncLogin,
};
