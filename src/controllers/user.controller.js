// const { query } = require("../db/connection");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const connection = require("../db/connection");
const { sign } = require("jsonwebtoken");

//configurtacion asincrona de las llamadas
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

module.exports = {
    asyncGetAllUsers: async (req, res) => {
        try {
            
            let sql = `SELECT id_user,name,last_name,username,email,address,phone, role.description as role
                        from user 
                        join role on user.id_role = role.id_role`;
            const rows = await query(sql);
            res.json(rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: err.message,
            });
        }
    },
    asyncGetUserByID: async (req, res) => {
        try {

            const { id } = req.params;
            let sql = `SELECT id_user,name,last_name,username,email,address,phone, role.description as role
                        from user
                        join role on user.id_role = role.id_role
                        where user.id_user = ${connection.escape(id)};`;
            const rows = await query(sql);
            res.json(rows);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: err.message,
            });

        }
    },
    asyncCreateUser: async (req, res) => {
        const body = req.body;
        try {
            
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            let sql = "INSERT INTO user VALUES (null, ?,?,?,?,?,?,?,2)";
            const rows = await query(sql, [body.username, body.password, body.email,
                body.name, body.last_name, body.address, body.phone]);
     
            res.json(rows);
        
        } catch (err) {
            // console.log(err);
            return res.status(500).json({
                success: 0,
                message: err.message,
            });
        }

    },
    asyncLogin: async (req, res) => {
        const body = req.body;

        if (body.email) {
            //get user by email
            let sql = "SELECT * FROM user where email = ?";
            const rows = await query(sql, [body.email]);
            if (rows.length) {
                //cliente envia el pass descifrado
                let result = body.password === rows[0].password;

                if (!result) {
                    result = compareSync(body.password, rows[0].password);
                }
                if (result) {
                    rows[0].password = undefined;
                    const token = sign(
                      { credentials: rows[0] },
                      process.env.JWT_SECRET,
                      { expiresIn: "1h" }
                    );

                    return res.status(200).json({
                        success: 1,
                        message: 'Login successful',
                        token: token
                    });
                }
            }
            return res.status(401).json({
                success: 0,
                data: "Invalid email or password",
            });
            
        } else {
            //get user by username
            let sql = "SELECT * FROM user where username = ?";
            const rows = await query(sql, [body.username]);
            if (rows.length) {
              //cliente envia el pass descifrado
              let result = body.password === rows[0].password;

              if (!result) {
                result = compareSync(body.password, rows[0].password);
              }
              if (result) {
                rows[0].password = undefined;
                const token = sign(
                  { credentials: rows[0] },
                  process.env.JWT_SECRET,
                  { expiresIn: "1h" }
                );

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
    }



};
