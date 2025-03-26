const { default: mongoose } = require("mongoose");
const AppError = require("./AppError");

exports.connectToDatabase = async function (URL) {
  try {
    await mongoose.connect(URL);
    console.log("✅ Database connected succeessfully");
  } catch (error) {
    throw new Error(error.message);
  }
};
