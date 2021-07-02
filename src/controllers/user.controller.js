const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const UserService = require("../services/user.service");

const asyncGetAllUsers = async (req, res) => {
  try {
    const rows = await UserService.getAllUser();
    return res.status(200).json({
      success: 1,
      data: rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: err.message,
    });
  }
};
const asyncGetUserByID = async (req, res) => {
  try {
    const { id } = req.params;
      const rows = await UserService.getUserById(id);
      if (rows.length > 0) {
          return res.status(200).json({
              success: 1,
              data: rows,
          });
      } else {
        return res.status(404).json({
            success: 0,
            message: "User Not Found",
        });

      }

  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: err.message,
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
      success: 1,
      data: rows,
    });
  } catch (err) {
    return res.status(500).json({
      success: 0,
      message: err.message,
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
          success: 1,
          message: "Login successful",
          token: token,
        });
      }
    }
    return res.status(401).json({
      success: 0,
      data: "Invalid email or password",
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
          success: 1,
          message: "Login successful",
          token: token,
        });
      }
    }
    return res.status(401).json({
      success: 0,
      data: "Invalid username or password",
    });
  }
};

module.exports = {
  asyncGetAllUsers,
  asyncGetUserByID,
  asyncCreateUser,
  asyncLogin,
};
