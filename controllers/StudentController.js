class StudentController {
  constructor(client) {
    this.client = client;
  }

  getStudents = async (req, res) => {
    try {
      const table = await this.client.query("SELECT * FROM students;");
      console.log(table.rows);
      res.json(table.rows);
    } catch (err) {
      console.log("error while getting table: ", err.stack);
      res.status(503).send(`error while getting table: ${err.message}`);
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
      const table = await this.client.query("SELECT * FROM students;");
      res.json(table.rows);
    } catch (err) {
      console.log("error while inserting data to table: ", err.stack);
      res
        .status(503)
        .send(`error while inserting data to table: ${err.message}`);
    }
  };

  updateStudent = async (req, res) => {
    try {
      console.log("request params", req.params);
      let [col, val] = [req.params.column, req.params.value];
      if (col === "first_name" || col === "last_name") {
        val = `'${val}'`;
      }

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
        `UPDATE students SET ${updates} WHERE ${col} = ${val};`
      );
      console.log(`updated ${updatedData.rowCount} row(s)`);
      const table = await this.client.query("SELECT * FROM students;");
      res.json(table.rows);
    } catch (err) {
      console.log("error while updating data: ", err.stack);
      res.status(503).send(`error while updating data: ${err.message}`);
    }
  };
}

module.exports = StudentController;
