const { error } = require("console");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(`Connection to Database is Falid ${error}`);
  }
};

module.exports = connectDB;
