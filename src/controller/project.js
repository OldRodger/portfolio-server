const Project = require("../model/Project");
const HandlerFactory = require("../util/HandlerFactory");
const handlerFactory = new HandlerFactory(Project);

exports.createProject = handlerFactory.createOne();
exports.getAllProjects = handlerFactory.getAll();
exports.getProject = handlerFactory.getOne();
exports.updateProject = handlerFactory.updateOne();
exports.deleteProject = handlerFactory.deleteOne();
