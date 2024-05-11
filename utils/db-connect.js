const mongoose = require("mongoose");

const URI = process.env.DATABASE_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Db Connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed", error);
  }
};

module.exports = connectDb;
