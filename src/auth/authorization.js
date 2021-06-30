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
          const data = jwt.verify(token, process.env.JWT_SECRET);
          let credentials = data.credentials;

          //console.log(typeof credentials.id_user);
          
          let id = parseInt(req.params.id, 10);
          //   console.log(typeof id);

        	if (
            credentials.id_role === 1 ||
            credentials.id_user === id
        	) {
          		next();
        	} else {
          		res.status(401).json({
            		success: 0,
            		message: "Access denied! Unauthorized user",
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