class StudentRouter {
  constructor(express, studentController) {
    this.express = express;
    this.controller = studentController;
  }

  routes = () => {
    let router = this.express.Router();
    router.get("/", this.controller.getStudents);
    router.post("/", this.controller.insertStudent);
    router.put("/:column/:value", this.controller.updateStudent);
    return router;
  };
}

module.exports = StudentRouter;
