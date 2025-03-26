process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down...");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const app = require("./app");
const { connectToDatabase } = require("./src/util/db");
const port = process.env.PORT || 8000;
const dbUrl = "mongodb://localhost:27017/test";

(async () => {
  await connectToDatabase(dbUrl);
})();

const server = app.listen(port, () => {
  console.log(`✅ Server running on http://127.0.0.1:${port}/`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED EXCEPTION 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
