var jwt = require('jsonwebtoken');


const AuthorizationAdmin = (req, res, next) => {
  //authorization typeof
  let token = req.get("authorization");
  if (typeof token !== "undefined") {
    try {
      //separate jsonwebtoken
      const tokenArray = token.split(" ");
      token = tokenArray[1];
      //   console.log(token);
      const data = jwt.verify(token, process.env.JWT_SECRET);
      //all data user encode

      let credentials = data.credentials;
      if (credentials.id_role === 1) {
        next();
      } else {
        res.status(401).json({
          success: false,
          message: "You need administrator privileges",
          data: {}
        });
      }
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err,
        data: {}
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Should have authorization token",
      data: {}
    });
  }
};

const AuthorizationUser = (req, res, next) => {
    let token = req.get("authorization");
    if (typeof token !== "undefined") {
      try {
        const tokenArray = token.split(" ");
        token = tokenArray[1];
        const { credentials } = jwt.verify(token, process.env.JWT_SECRET);

        if (credentials.id_role === 1 || credentials.id_role === 2) {
          next();
        } else {
          res.status(401).json({
            success: 0,
            message: "Access denied! Unauthorized User",
          });
        }
      } catch (error) {
        // console.log(error.message);
        res.status(403).json({
          success: 0,
          message: error,
        });
      }
    } else {
      res.status(400).json({
        success: 0,
        message: "Should have authorization token",
      });
    }
};

const ConfidentialInfo = (req, res, next) => {
    let token = req.get("authorization");
    if (typeof token !== "undefined") {
      try {
        const tokenArray = token.split(" ");
        token = tokenArray[1];
        const { credentials } = jwt.verify(token, process.env.JWT_SECRET);
        let id_user = parseInt(req.params.id_user);
        // console.log(id, typeof id);
        // console.log(credentials.id_user, typeof credentials.id_user);

        if (credentials.id_role === 1 || credentials.id_user === id_user) {
          next();
        } else {
          res.status(401).json({
            success: false,
            message: "Access denied! Unauthorized Id User info",
            data: {
              current_user: credentials.id_user,
              target_user: id_user,
            }
          });
        }
      } catch (error) {
        // console.log(error.message);
        res.status(403).json({
          success: false,
          message: error,
          data: {}
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Should have authorization token",
        data: {}
      });
    }
};
  
const CurrentUser = (req, res, next) => {
    let token = req.get("authorization");
    if (typeof token !== "undefined") {
      try {
        const tokenArray = token.split(" ");
        token = tokenArray[1];
        const { credentials } = jwt.verify(token, process.env.JWT_SECRET);
        let id_user = req.body.id_user;
        // console.log(id, typeof id);

        if (credentials.id_role === 1 || credentials.id_user === id_user) {
          next();
        } else {
          res.status(401).json({
            success: false,
            message: "Access denied! Unauthorized add Info to another User",
            data: {
              current_user: credentials.id_user,
              target_user: id_user,
            },
          });
        }
      } catch (error) {
        // console.log(error.message);
        res.status(403).json({
          success: false,
          message: error,
          data: {}
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Should have authorization token",
        data: {}
      });
    }
};

module.exports = {
  AuthorizationAdmin,
  AuthorizationUser,
  ConfidentialInfo,
  CurrentUser
};