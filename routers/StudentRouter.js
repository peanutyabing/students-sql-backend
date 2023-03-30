class StudentRouter {
  constructor(express, studentController) {
    this.express = express;
    this.controller = studentController;
  }

  routes = () => {
    let router = this.express.Router();
    router.get("/", this.controller.getStudents);
    router.post("/", this.controller.insertStudents);
    return router;
  };
}

module.exports = StudentRouter;
