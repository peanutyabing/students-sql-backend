class StudentController {
  constructor(client) {
    this.client = client;
  }

  getStudents = async (req, res) => {
    const queryParams = req.query;
    console.log(queryParams);
    if (Object.keys(queryParams).length) {
      let queryStr = "WHERE ";
      for (const key in queryParams) {
        if (key === "first_name" || key === "last_name") {
          queryStr += `${key} = '${queryParams[key]}' AND `;
        } else {
          queryStr += `${key} = ${queryParams[key]} AND `;
        }
      }
      queryStr = queryStr.slice(0, -4);
      console.log(`SELECT * FROM students ${queryStr} ORDER BY id;`);
      try {
        const table = await this.client.query(
          `SELECT * FROM students ${queryStr} ORDER BY id;`
        );
        console.log(table.rows);
        res.json(table.rows);
      } catch (err) {
        console.log("error while getting table: ", err.stack);
        res.status(503).send(`error while getting table: ${err.message}`);
      }
    } else {
      try {
        const table = await this.client.query(
          "SELECT * FROM students ORDER BY id;"
        );
        console.log(table.rows);
        res.json(table.rows);
      } catch (err) {
        console.log("error while getting table: ", err.stack);
        res.status(503).send(`error while getting table: ${err.message}`);
      }
    }
  };

  insertStudent = async (req, res) => {
    try {
      const [first_name, last_name, mobile, gender] = [
        req.body.first_name,
        req.body.last_name,
        req.body.mobile,
        req.body.gender,
      ];
      const newData = await this.client.query(
        `INSERT INTO students (first_name, last_name, mobile, gender) VALUES ('${first_name}', '${last_name}', ${mobile}, ${gender});`
      );
      console.log(`inserted ${newData.rowCount} row(s)`);
      const table = await this.client.query(
        "SELECT * FROM STUDENTS ORDER BY id;"
      );
      res.json(table.rows);
    } catch (err) {
      console.log("error while inserting data to table: ", err.stack);
      res
        .status(503)
        .send(`error while inserting data to table: ${err.message}`);
    }
  };

  updateStudent = async (req, res) => {
    console.log("request params", req.params);
    const idToUpdate = req.params.value;
    try {
      let updates = "";
      for (const key in req.body) {
        if (key === "first_name" || key === "last_name") {
          updates += `${key} = '${req.body[key]}', `;
        } else {
          updates += `${key} = ${req.body[key]}, `;
        }
      }
      updates = updates.slice(0, -2);
      const updatedData = await this.client.query(
        `UPDATE students SET ${updates} WHERE id = ${idToUpdate};`
      );
      console.log(`updated ${updatedData.rowCount} row(s)`);
      const table = await this.client.query(
        "SELECT * FROM STUDENTS ORDER BY id;"
      );
      res.json(table.rows);
    } catch (err) {
      console.log("error while updating data: ", err.stack);
      res.status(503).send(`error while updating data: ${err.message}`);
    }
  };

  removeStudent = async (req, res) => {
    const idToRemove = req.params.value;
    console.log("request params", idToRemove);
    try {
      const deletedData = await this.client.query(
        `DELETE FROM students WHERE id = ${idToRemove};`
      );
      console.log(`deleted ${deletedData.rowCount} row(s)`);
      const table = await this.client.query("SELECT * FROM students;");
      res.json(table.rows);
    } catch (err) {
      console.log("error while deleting data: ", err.stack);
      res.status(503).send(`error while deleting data: ${err.message}`);
    }
    try {
      const deletedAddress = await this.client.query(
        `DELETE FROM student_addresses WHERE student_id = ${idToRemove};`
      );
    } catch (err) {
      console.log("error while deleting student address: ", err.stack);
    }
  };
}

module.exports = StudentController;
