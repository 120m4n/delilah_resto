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
            
            let sql = "SELECT * FROM user";
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
            // console.log(req.body);
            // const user_id = req.body;
            //Obtener informacion de un usuario por id
            const { id } = req.params;
            let sql = `select id_user, user.name, username, email, last_name, address, phone, role.description
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
            let sql = "INSERT INTO user VALUES (null, ?,?,?,?,?,?,?,1)";
            const rows = await query(sql, [body.username, body.password, body.email,
                body.name, body.last_name, body.address, body.phone]);
     
            res.json(rows);
        
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: err.message,
            });
        }

    },
    asyncLogin: async (req, res) => {
        const body = req.body;
        if ((!body.email && !body.username) || !body.password) {
            return res.status(400).json({
                success: 0,
                message:
                    "Should have either email or username, and password.",
            });
        } else if (body.email) {
            //get user by email
            let sql = "SELECT * FROM user where email = ?";
            const rows = await query(sql, [body.email]);
            // res.json(rows);
            if (rows.length) {
                //envia el pass cifrado
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
                //envia el pass cifrado
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
