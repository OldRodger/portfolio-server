const catchAsync = require("./catchAsync");
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
      const doc = await this.model.findById(req.params.id);

      if (!doc) throw new AppError(`No document found with that ID`, 404);

      return res.status(200).json({
        status: "success",
        data: {
          doc,
        },
      });
    });
  }

  updateOne() {
    return catchAsync(async (req, res) => {
      const doc = await this.model.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!doc) throw new AppError(`No document found with that ID`, 404);

      return res.status(200).json({
        status: "success",
        data: {
          doc,
        },
      });
    });
  }

  deleteOne() {
    return catchAsync(async (req, res) => {
      const doc = await this.model.findByIdAndDelete(req.params.id);

      if (!doc) throw new AppError(`No document found with that ID`, 404);

      return res.status(204).json({
        status: "success",
        data: null,
      });
    });
  }
};
