const express = require('express');
const jwt = require('jsonwebtoken');
const admin = express.Router();
const db = require('../config/database');

admin.post("/login", async (req, res, next) =>{
    const {admin_mail, admin_password} = req.body;

    const query = `SELECT * FROM admins WHERE admin_mail = '${admin_mail}' AND admin_password = '${admin_password}';`;

    const rows = await db.query(query);
    if(admin_mail && admin_password){
        if(rows.length == 1){
            const token = jwt.sign({
                admin_id: rows[0].admin_id,
                admin_name : rows[0].admin_name,
                admin_mail: rows[0].admin_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        }
        else{
            return res.status(200).json({ code: 401, message: "Usuario y/o contaseña incorrectos" });
        }    
    }
    return res.status(500).json({ code: 500, message: "Campos incorrectos" });
    
});

admin.post("/signin", async (req, res, next) => {
    const { admin_name, admin_mail, admin_password } = req.body;

    if (admin_name && admin_mail && admin_password) {

        let query = `INSERT INTO admins(admin_name, admin_mail, admin_password)`;
        query += `VALUES ('${admin_name}', '${admin_mail}', '${admin_password}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error :(" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos:(" });

});

admin.get("/", async (req, res, next) => {

    let query = `SELECT * FROM admins`;

    const rows = await db.query(query);

    return res.status(201).json({ code: 201, message: rows });

});

module.exports = admin;