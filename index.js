const express = require("express");
const { Pool } = require("pg");

require("dotenv").config();
const pgConnectionsConfigs = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

const pool = new Pool(pgConnectionsConfigs);

const StudentController = require("./controllers/StudentController.js");
const StudentRouter = require("./routers/StudentRouter.js");
const studentController = new StudentController(pool);
const studentRouter = new StudentRouter(express, studentController);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", studentRouter.routes());

// app.get("/", (req, res) => {
//   console.log("get request came in");

//   const whenDoneWithQuery = (err, result) => {
//     if (err) {
//       console.log("Error executing query", err.stack);
//       res.status(503).send(result.rows);
//       return;
//     }
//     console.log(result.rows[0]);
//     res.send(result.rows);
//   };

//   const sqlShowStudents = "SELECT * FROM students";
//   pool.query(sqlShowStudents, whenDoneWithQuery);
// });

// app.post("/", (req, res) => {
//   console.log("post request came in");
//   console.log(req.body);

//   const [first_name, last_name, mobile, gender] = [
//     req.body.first_name,
//     req.body.last_name,
//     req.body.mobile,
//     req.body.gender,
//   ];

//   const whenDoneWithQuery = (err, result) => {
//     if (err) {
//       console.log("Error executing query", err.stack);
//       res.status(503).send(result.rows);
//       return;
//     }
//     console.log(result.rows);
//     res.send(result.rows);
//   };
//   const sqlInsert = `INSERT INTO students (first_name, last_name, mobile, gender) VALUES ('${first_name}', '${last_name}', ${mobile}, ${gender});`;
//   pool.query(sqlInsert, whenDoneWithQuery);
// });

// app.put("/:column/:value", (req, res) => {
//   console.log("put request came in");
//   console.log(req.params);
//   let [col, val] = [req.params.column, req.params.value];
//   if (col === "first_name" || col === "last_name") {
//     val = `'${val}'`;
//   }
//   console.log(req.body);
//   let updates = "";
//   for (const key in req.body) {
//     if (key === "first_name" || key === "last_name") {
//       updates += `${key} = '${req.body[key]}', `;
//     } else {
//       updates += `${key} = ${req.body[key]}, `;
//     }
//   }
//   updates = updates.slice(0, -2);

//   const whenDoneWithQuery = (err, result) => {
//     if (err) {
//       console.log("Error executing query", err.stack);
//       res.status(503).send(result.rows);
//       return;
//     }
//     console.log(result.rows);
//     res.send(result.rows);
//   };
//   const sqlUpdate = `UPDATE students SET ${updates} WHERE ${col} = ${val};`;
//   console.log(sqlUpdate);
//   pool.query(sqlUpdate, whenDoneWithQuery);
// });

// app.delete("/:column/:value", (req, res) => {
//   console.log("delete request came in");
//   console.log(req.params);
//   let [col, val] = [req.params.column, req.params.value];
//   if (col === "first_name" || col === "last_name") {
//     val = `'${val}'`;
//   }

//   const whenDoneWithQuery = (err, result) => {
//     if (err) {
//       console.log("Error executing query", err.stack);
//       res.status(503).send(result.rows);
//       return;
//     }
//     console.log(result.rows);
//     res.send(result.rows);
//   };
//   const sqlDelete = `DELETE FROM students WHERE ${col} = ${val};`;
//   pool.query(sqlDelete, whenDoneWithQuery);
// });

app.listen(3004, () => {
  console.log("Listening to port 3004");
});
