require("dotenv").config();
const express = require("express");
const AppError = require("./src/util/AppError");
const globalError = require("./src/middleware/globalError");
const morgan = require("morgan");
const projectRoute = require("./src/routes/project.routes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));

// ROUTES

app.use("/api/v1/projects", projectRoute);

app.all("*", (req) => {
  throw new AppError(
    `Cant find ${req.method.toUpperCase()} method to ${
      req.originalUrl
    } on this server`,
    404
  );
});

app.use(globalError);

module.exports = app;
