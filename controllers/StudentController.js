class StudentController {
  constructor(client) {
    this.client = client;
  }

  getStudents = async (req, res) => {
    try {
      const data = await this.client.query("SELECT * FROM students;");
      console.log(data.rows);
      res.json(data.rows);
    } catch (err) {
      console.log("error while getting data: ", err.stack);
      res.status(503).send(`error while getting data: ${err.message}`);
    }
  };
}

module.exports = StudentController;
