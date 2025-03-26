const { model, Schema } = require("mongoose");
const { default: slugify } = require("slugify");

const validFrontends = [
  "html",
  "css",
  "scss",
  "tailwindcss",
  "javascript",
  "react",
  "next",
  "vue",
  "angular",
  "typescript",
  "php",
  "pug",
  "ejs",
  "handlebars",
];

const validBackends = [
  "node",
  "express",
  "django",
  "flask",
  "spring boot",
  "laravel",
  "dotnet",
];

const validDatabases = [
  "mssql",
  "mysql",
  "sqlite",
  "postgres",
  "oracle",
  "mongodb",
  "drizzle",
  "supabase",
];

const projectSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Project must have a title"],
    },
    description: {
      type: String,
      required: [true, "Project must have a description"],
    },
    photo: String,
    projectType: {
      type: String,
      required: [true, "projectType must be (Frontend / Backend / Fullstack)"],
      enum: {
        values: ["frontend", "backend", "fullstack"],
        message: "projectType must be (Frontend / Backend / Fullstack)",
      },
    },
    techStack: {
      type: [String],
      required: [
        true,
        "Please mention one or more technologies used in this project",
      ],
      validate: {
        validator(arr) {
          return (
            Array.isArray(arr) &&
            arr.length &&
            arr.every((val) =>
              [...validFrontends, ...validBackends, ...validDatabases].includes(
                val
              )
            )
          );
        },
        message: "Please mention one or more technologies used in this project",
      },
    },
    url: String,
    slug: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = model("project", projectSchema);
