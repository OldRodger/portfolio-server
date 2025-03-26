const { Router } = require("express");
const controller = require("../controller/project");

const router = Router();

router.route("/").get(controller.getAllProjects).post(controller.createProject);
router.route("/:slug").get(controller.getProject);

module.exports = router;
