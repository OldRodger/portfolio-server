const { Router } = require("express");
const controller = require("../controller/project");

const router = Router();

router.route("/").get(controller.getAllProjects).post(controller.createProject);
router
  .route("/:id")
  .get(controller.getProject)
  .patch(controller.updateProject)
  .delete(controller.deleteProject);

module.exports = router;
