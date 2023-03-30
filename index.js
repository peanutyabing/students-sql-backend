const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const EXPRESS_PORT = 3004;

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", studentRouter.routes());

app.listen(EXPRESS_PORT, () => {
  console.log(`Listening to port ${EXPRESS_PORT}`);
});
