var jwt = require('jsonwebtoken');

module.exports = {
  AuthorizationAdmin: (req, res, next) => {
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
            success: 0,
            message: "You need administrator privileges",
          });
        }
      } catch (err) {
        res.status(403).json({
          success: 0,
          message: err,
        });
      }
    } else {
      res.status(400).json({
        success: 0,
        message: "Should have authorization token",
      });
    }
  },
  AuthorizationUser: (req, res, next) => {
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
  },

  ConfidentialInfo: (req, res, next) => {
    let token = req.get("authorization");
    if (typeof token !== "undefined") {
      try {
        const tokenArray = token.split(" ");
        token = tokenArray[1];
        const { credentials } = jwt.verify(token, process.env.JWT_SECRET);
        let id = parseInt(req.params.id);
        // console.log(id, typeof id);

        if (credentials.id_role === 1 || credentials.id_user === id) {
          next();
        } else {
          res.status(401).json({
            success: 0,
            message: "Access denied! Unauthorized Id User info",
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
  },
  CurrentUser: (req, res, next) => {
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
            success: 0,
            message: "Access denied! Unauthorized add Info to another User",
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
  },
};