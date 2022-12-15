const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.post("/", async (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_email, emp_address } = req.body;

    if (emp_name && emp_lastname && emp_phone && emp_email && emp_address) {
        let query = "INSERT INTO employees(emp_name, emp_lastname, emp_phone, emp_email, emp_address)";
        query += `VALUES('${emp_name}', '${emp_lastname}', '${emp_phone}', '${emp_email}', '${emp_address}')`;

        const rows = await db.query(query);
        console.log(rows);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error :(" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos :(" });

});


employees.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE emp_id = ${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente" });
    }
    else {
        return res.status(404).json({ code: 404, message: "Empleado no encontrado :(" });
    }
});

employees.put("/:id([0-9]{1,3})", async (req, res, next) => {
    
    const { emp_name, emp_lastname, emp_phone, emp_email, emp_address } = req.body;

    console.log(emp_name);
    if (emp_name && emp_lastname && emp_phone && emp_email) {

        let query = `UPDATE employees SET emp_name = '${emp_name}',emp_lastname = '${emp_lastname}', `;
        query += `emp_phone = '${emp_phone}',emp_email= '${emp_email}', emp_address = '${emp_address}' `;
        query += `WHERE emp_id = ${req.params.id}`

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error :(" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos :(" });

});
employees.get("/", async (req, res, next) => {
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({ code: 1, message: emp });
});

employees.get("/:id([0-9]{1,3})", async (req, res, next) => {
    const id = req.params.id;
    if (id >= 0 && id <= 1000) {
        const emp = await db.query("SELECT * FROM employees WHERE emp_id = " + id + ";");
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado :(" });
});

employees.get("/:name([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE emp_name LIKE '%" + name + "%';");
    if (emp.length > 0) {
        return res.status(200).json({ code: 1, message: emp });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado :(" });
});

module.exports = employees;