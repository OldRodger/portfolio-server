const catchAsync = require("./catchAsync");
const Project = require("../model/Project");
const AppError = require("./AppError");

module.exports = class HandlerFactory {
  constructor(model) {
    this.model = model;
  }

  createOne() {
    return catchAsync(async (req, res) => {
      const newDoc = await this.model.create({ ...req.body });
      return res.status(201).json({
        status: "success",
        data: {
          doc: newDoc,
        },
      });
    });
  }

  getAll() {
    return catchAsync(async (req, res) => {
      const docs = await this.model.find();
      return res.status(200).json({
        status: "success",
        results: docs.length,
        data: {
          docs,
        },
      });
    });
  }

  getOne() {
    return catchAsync(async (req, res) => {
      const doc = await this.model.findOne({
        slug: req.params.slug,
      });

      if (!doc)
        throw new AppError(`Project ${req.params.slug} cannot be found`);

      return res.status(200).json({
        status: "success",
        data: {
          doc,
        },
      });
    });
  }
};
