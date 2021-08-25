const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    err ? console.error(err) : res.send(result);
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const salary = req.body.salary;

  db.query(
    "INSERT INTO employees (name,age,country,position,salary) VALUES(?,?,?,?,?)",
    [name, age, country, position, salary],
    (err, result) => {
      err ? console.log(err) : res.send("Value inserted");
    }
  );
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
