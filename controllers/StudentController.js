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

  insertStudents = async (req, res) => {
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
        .send(`error while inserting data totable: ${err.message}`);
    }
  };
}

module.exports = StudentController;
