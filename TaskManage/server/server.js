const express = require("express");
// const morgan = require('morgan')
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "taskmanager"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM task";
    db.query(sql, (err, data) => {
        if (err) return res.json("error")
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO task (`date`,`project`,`task`,`description`,`time`) VALUES (?)";
    const values = [
        req.body.date,
        req.body.project,
        req.body.task,
        req.body.description,
        req.body.time
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("error")
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE task SET date = ?, project = ?, task = ?, description = ?, time = ? WHERE ID = ?";
    const values = [
        req.body.date,
        req.body.project,
        req.body.task,
        req.body.description,
        req.body.time
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("error")
        return res.json(data);
    })
})

app.delete('/Home/:id', (req, res) => {
    const sql = "DELETE FROM task WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

const port = 8081;
app.listen(port, () => {
    console.log("das");
})